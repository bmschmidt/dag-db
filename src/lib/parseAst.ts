
type Links = {
  requires?: string[],
  params?: string[],
  loads?: string[],
}

export function parseDuckdbAst(node: Record<string, any>): Links {
  return recurseParse(JSON.parse(JSON.stringify(node)));
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
    requires: [...(a.requires || []), ...(b.requires || [])],
    params: [...(a.params || []), ...(b.params || [])],
    loads: [...(a.loads || []), ...(b.loads || [])],
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
  return fuse(...children)
}