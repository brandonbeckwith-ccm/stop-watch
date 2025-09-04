import { inject, provide, ref } from "vue"

export const initateNavBar = () => {

    const title = ref<string>('')
    const icon = ref<string>('')
    const status = ref<string>('')

    const setTitle = (item: string) => {
        title.value = item
    }
    const setIcon = (item: string) => {
        icon.value = item
    }
    const setStatus = (item: string) => {
        status.value = item
    }
    provide('nav-status', { title, icon, status, setTitle, setIcon, setStatus })
}
export const useNavBar = () => {
    const navBarInject = inject<{ title: string; icon:string ,status:string, setTitle: (item:string) => void; setIcon: (item:string) => void; setStatus:(item:string)=>void }>('nav-status')
    if (!navBarInject) {
        throw new Error("Navigation not provided!")
    }
    return navBarInject
}