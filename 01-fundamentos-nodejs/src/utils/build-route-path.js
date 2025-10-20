// /users/:id
export function buildRoutePath(path) {

    // Fazendo busca na API com parametros EXP: (:ID)
    const routeParamentersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParamentersRegex, '(?<$1>[a-z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWithParams}`)
    // return new RegExp()
    // console.log(Array.from(path.matchAll(routeParamentersRegex)))
    return pathRegex
}