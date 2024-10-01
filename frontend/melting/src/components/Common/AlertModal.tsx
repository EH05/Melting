import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

interface AlertModalProps {
  title: string
  messages: string[]
  isOpen: boolean
  onClose: () => void
}

export default function AlertModal({
  title,
  messages,
  isOpen,
  onClose,
}: AlertModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {messages.map((message, index) => (
              <p key={index} className="mb-2 last:mb-0">
                {message}
              </p>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={'bg-primary-400 rounded-3xl text-center'}
            onClick={onClose}
          >
            확인
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
