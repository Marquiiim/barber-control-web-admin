import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
    CreditCard,
    UserX,
    Ban
} from "lucide-react"
import { useState } from "react"
import api from "@/services/apiInstance"

export default function AbsencePopover({
    children,
    appointmentId
}) {
    const [open, setOpen] = useState(false)

    const handleAction = async (reason) => {
        try {
            const response = await api.post('/admin-appointments/appointments/absence', {
                id: appointmentId,
                reason: reason
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger >
                <Button
                    variant="destructive"
                    className="h-8 px-4 text-[13px]"
                >
                    Ausência
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[260px] p-0 bg-zinc-900 border-zinc-800 shadow-2xl"
                align="start"
                sideOffset={5}
            >
                <div className="p-2 space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-sm font-normal hover:bg-zinc-800 hover:text-white text-zinc-300 h-9 px-3"
                        onClick={() => handleAction('Pagamento_pendente')}
                    >
                        <CreditCard className="h-4 w-4 text-yellow-500" />
                        Pagamento pendente
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-sm font-normal hover:bg-zinc-800 hover:text-white text-zinc-300 h-9 px-3"
                        onClick={() => handleAction('N_o_compareceu')}
                    >
                        <UserX className="h-4 w-4 text-red-500" />
                        Não compareceu
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-sm font-normal hover:bg-zinc-800 hover:text-white text-zinc-300 h-9 px-3"
                        onClick={() => handleAction('Bloqueado_por_administrador')}
                    >
                        <Ban className="h-4 w-4 text-orange-500" />
                        Apenas bloquear
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}