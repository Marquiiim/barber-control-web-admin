import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-background p-4'>
        Teste
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
