import AdminPanel from "@/components/admin-panel/admin-panel"
import ServiceNow from "@/components/service-now/service-now"
import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return (
    <>
      <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>
        <AdminPanel />
        <ServiceNow />
      </div>

      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        duration={4000}
      />

    </>
  )
}
