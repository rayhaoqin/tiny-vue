import helperCreateTreeFunc from './helperCreateTreeFunc'
import map from './map'

const mapTreeItem = ({ parent, obj, iterate, context, path, node, parseChildren, opts }) => {
  let mapChildren = opts.mapChildren || parseChildren

  return map(obj, (item, index) => {
    const paths = path.concat([`${index}`])
    const nodes = node.concat([item])
    const rest = iterate.call(context, item, index, obj, paths, parent, nodes)

    if (rest && item && parseChildren && item[parseChildren]) {
      rest[mapChildren] = mapTreeItem({
        item,
        obj: item[parseChildren],
        iterate,
        context,
        path: paths,
        node: nodes,
        parseChildren,
        opts
      })
    }

    return rest
  })
}

const mapTree = helperCreateTreeFunc(mapTreeItem)

export default mapTree
