import React from 'react';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/inputs/Text';

interface EmailFormProps {
  email: string;
  loading: boolean;
  isCollapsed: boolean;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onShowEmailForm: () => void;
}

export default function EmailForm({
  email,
  loading,
  isCollapsed,
  onEmailChange,
  onSubmit,
  onShowEmailForm,
}: EmailFormProps) {
  if (isCollapsed) {
    return (
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="mb-1 text-xs text-gray-400">Email</p>
          <p className="text-foreground text-sm font-medium">{email}</p>
        </div>
        <Button
          onClick={onShowEmailForm}
          variant="secondary"
          className="border-none text-sm"
        >
          Cambiar
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="gap-md flex flex-col">
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          disabled={loading}
        />
        <p className="text-foreground text-center text-xs">
          Al entrar, aceptas las{' '}
          <Link href="/condiciones" className="font-bold underline">
            condiciones
          </Link>{' '}
          y la{' '}
          <Link href="/privacidad" className="font-bold underline">
            política de privacidad
          </Link>
          .
        </p>
        <Button type="submit" disabled={loading || !email}>
          {loading ? 'Enviando...' : 'Enviar código de acceso'}
        </Button>
      </div>
    </form>
  );
}
