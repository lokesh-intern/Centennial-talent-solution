import { create } from 'zustand'

type User = {
    name: string,
    email: string,
    phone: string,
}

export type UserStore = {
    user: User | null,
    setUser: (user: User) => void,
    removeUser: () => void,
}

const userStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    removeUser: () => set({ user: null }),
}))

export default userStore;