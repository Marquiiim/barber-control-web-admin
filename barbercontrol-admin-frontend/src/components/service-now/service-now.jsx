import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Mail,
    Phone,
    Scissors,
    Calendar,
    Clock,
    CreditCard,
} from "lucide-react";

export default function ServiceInfo() {

    return (
        <Card className="shadow-sm border-gray-100">
            <CardHeader className="from-gray-900 to-gray-800">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
                        <span>Serviço Atual</span>
                        <Badge className="bg-blue-500 text-[10px]">
                            Status atual
                        </Badge>
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-3 pb-2">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0">
                        PJ
                    </div>
                    <div>
                        <p className="font-semibold text-[15px]">Nome do cliente</p>
                        <p className="text-[12px] text-muted-foreground">Cliente excepcional</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-[13px]">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">email</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">celular</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <Scissors className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">serviço</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">data</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">horário</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] col-span-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                            Pagamento:
                            <span className="font-medium text-green-600">
                                tipo de pagamento
                            </span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-3">
                    <Button size="sm" className="h-8 px-3 text-[13px] bg-green-600 hover:bg-green-700 flex-1">
                        Finalizar
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 px-3 text-[13px] border-yellow-400 text-yellow-600">
                        Reagendar
                    </Button>
                    <Button size="sm" variant="destructive" className="h-8 px-3 text-[13px]">
                        Cancelar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}