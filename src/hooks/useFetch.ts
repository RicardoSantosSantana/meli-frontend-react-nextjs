import useSWR from "swr";
// uma ideia para useFetch
export function useFetch(url: string) {

    const { data, error } = useSWR(url, async url => {
        const response = await fetch(url);
        const data = await response.json()
        return data;
    })
    return { data, error }
}