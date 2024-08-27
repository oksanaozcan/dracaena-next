import IconButton from '../ui/icon-button';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export const SmmIconList = () => {
  return (
    <div className="flex gap-4 px-4 md:gap-2">
      <IconButton className="text-custom-green" onClick={undefined} icon={<Facebook/>} />
      <IconButton className="text-custom-green" onClick={undefined} icon={<Instagram/>} />
      <IconButton className="text-custom-green" onClick={undefined} icon={<Youtube/>} />
    </div>
  )
}