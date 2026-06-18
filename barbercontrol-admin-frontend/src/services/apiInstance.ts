import axios, { isAxiosError } from 'axios'
import { toast } from 'sonner'

interface ApiResponse<T = any> {
    success: boolean
    data: T
    message: string
    timestamp?: string
}

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

api.interceptors.response.use(
    response => {
        const data = response.data as ApiResponse

        if (data.success && data.message) toast.success(data.message)

        return data.data ?? response.data
    },

    (error: unknown) => {
        if (isAxiosError(error)) {
            if (error.response) {
                toast.error(error.response.data?.message || error.message)
            } else if (error.request) {
                toast.warning('Servidor não está respondendo')
            } else {
                toast.error(error.message || 'Error ao realizar ação')
            }
        } else {
            toast.error('Erro inesperado')
        }

        return Promise.reject(error)
    }
)

export default api