import type { ParseRelation } from "./parseSql";

/**
 * 
 * @param items - a list of ParseRelation objects, each representing a SQL query.
 * @returns The list in topological order, meaning that each item appears after all its prerequisities.
 */
export function topologicalSort(items: ParseRelation[]): ParseRelation[] {
  // A map from item name to the actual item
  const nameToItem = new Map<string, ParseRelation>();
  items.forEach((item) => nameToItem.set(item.tableName, item));

  // Build an adjacency list:
  // key = item name
  // value = list of items that *depend on* key
  const adjacency = new Map<string, string[]>();

  // Initialize adjacency with empty arrays for all items
  items.forEach((item) => adjacency.set(item.tableName, []));

  // Build in-degree map: counts how many prerequisites each item has
  const inDegree = new Map<string, number>();
  items.forEach((item) => inDegree.set(item.tableName, 0));

  // Fill in adjacency and in-degree
  items.forEach((item) => {
    // item.rel.requires are the dependencies for "item"
    (item.requires || []).forEach((depName) => {
      if (!nameToItem.has(depName)) {
        if (depName.match(/.parquet$|.csv$/g)) {
          // This is a file that is not a table.
          return;
        }
        throw new Error(`Item "${depName}" is required by "${item.tableName}" but does not exist.`);
      }
      // The dependency 'depName' leads to the item 'item.tableName'
      adjacency.get(depName)!.push(item.tableName);

      // Increase the in-degree (the number of prereqs) for 'item'
      inDegree.set(item.tableName, (inDegree.get(item.tableName) || 0) + 1);
    });
  });

  // Collect all items with no prerequisites
  const queue: string[] = [];
  inDegree.forEach((deg, nm) => {
    if (deg === 0) {
      queue.push(nm);
    }
  });

  const result: ParseRelation[] = [];

  // Process until no items left in queue
  while (queue.length > 0) {
    const currentName = queue.shift() as string;
    result.push(nameToItem.get(currentName)!);

    // For every item that depends on the current item...
    adjacency.get(currentName)!.forEach((dependentName) => {
      // Reduce its in-degree by 1
      const newDegree = (inDegree.get(dependentName) || 0) - 1;
      inDegree.set(dependentName, newDegree);

      // If in-degree becomes 0, it can be built now
      if (newDegree === 0) {
        queue.push(dependentName);
      }
    });
  }

  // If result doesn't contain all items, there must be a cycle
  if (result.length !== items.length) {
    throw new Error("Cycle detected or invalid dependencies exist.");
  }

  return result;
}
