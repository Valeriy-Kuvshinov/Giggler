import { useSearchParams } from "react-router-dom"

export function GigFilter(filterBy) {
    const [searchParams] = useSearchParams()
    const queryParams = {}
    for (const [key, value] of searchParams) {
     queryParams[key] = value
    }

    return (
        <div></div>
      )
}