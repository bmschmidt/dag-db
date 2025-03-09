
type Links = {
  requires?: string[],
  params?: string[],
  loads?: string[],
}

/**
 * 
 * @param node - the AST node to parse
 * @returns A list of the elements that are called inside the query.
 * Currently, this includes:
 * - Tables: the tables that are read from.
 * - Parameters: the named parameters ("SELECT * FROM table WHERE col1 = $foo")
 * - Loads: any web resources that will be downloaded by the query.
 */
export function parseDuckdbAst(node: Record<string, any>): Links {
  return recurseParse(JSON.parse(JSON.stringify(node)));
}

function dedupe<T>(...arr: (T[] | undefined)[]) : T[] {
  const flat = arr.filter(d => d !== undefined).flat()
  return Array.from(new Set(flat))
}

function fuse(...l: Links[]): Links {
  if (l.length === 0) {
    return {}
  }
  if (l.length === 1) {
    return l[0]
  }
  const a = l[0]
  const b = fuse(...l.slice(1))
  return {
    requires: dedupe(a.requires, b.requires),
    params: dedupe(a.params, b.params),
    loads: dedupe(a.loads, b.loads),
  }
}

function recurseParse(node: any, depth=0) : Links {
  if (node === null || node === undefined) {
    return {}
  }
  if (node.type === 'BASE_TABLE') {
    return {requires: [node.table_name]}
  }
  if (node.type === 'VALUE_PARAMETER') {
    return {params: [node.identifier]}   
  }
  if (node.query_location) {
    node.query_location = 1
  }

  const children : Links[] = []
  for (const [key, value] of Object.entries(node)) {
    if (Array.isArray(value)) {
      for (const child of value) {
        children.push(recurseParse(child))
      }
    } else if (typeof value === 'object') {
      const childLinks = recurseParse(value);      
      children.push(childLinks)
    } else {
      // console.log(key, value, 'is not an object')
    }
  }
  const kids = fuse(...children)

  // CTEs are generated inside the query, so don't
  // need to be loaded elsewhere.
  const ctes = (node.cte_map?.map || [])
    .map(v => v.key)
  if (ctes.length > 0) {
    kids.requires = [...(kids.requires || [])
    .filter(d => !ctes.includes(d))]
  }

  return kids;
}