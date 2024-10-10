import toast, {Toast} from "react-hot-toast";
import { useRouter } from "next/navigation"

interface CustomToastProps {
  t: Toast;
}

export const CustomToast: React.FC<CustomToastProps> = ({t}) => {
  const router = useRouter();
  return (
    <div
    style={{
      backgroundColor: '#fff',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}
  >
    <span>You should be registered and logged in to add items to your cart or favorites.</span>
    <div style={{ display: 'flex', gap: '8px' }}>
      <button
        onClick={() => {
          router.push('/auth/login');
          toast.dismiss(t.id);
        }}
        style={{ color: 'blue', cursor: 'pointer' }}
      >
        Sign in
      </button>
      <button
        onClick={() => {
          router.push('/auth/register');
          toast.dismiss(t.id);
        }}
        style={{ color: 'blue', cursor: 'pointer' }}
      >
        Sign up
      </button>
      <button
        onClick={() => toast.dismiss(t.id)}
        style={{ color: 'red', cursor: 'pointer' }}
      >
        Not now
      </button>
    </div>
  </div>
  )
}