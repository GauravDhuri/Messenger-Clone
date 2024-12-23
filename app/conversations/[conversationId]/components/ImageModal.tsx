'use client';

import Modal from '@/app/components/Modal';
import Image from 'next/image';

interface ImageModalOpenProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalOpenProps> = ({ isOpen, onClose, src }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-80">
        <Image alt="Image" className="object-cover" fill src={src || ''} />
      </div>
    </Modal>
  );
};

export default ImageModal;
