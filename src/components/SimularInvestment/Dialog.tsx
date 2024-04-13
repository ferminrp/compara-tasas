import * as React from 'react';
import SimulacionOnboarding from './Onboarding';
import { useMediaQuery } from './hooks/use-media-query';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';

export default function SimularInversion({ data, multiplo30 }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='!w-full !bg-[#6469F2] !text-white'>
            Simulá tu inversión
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <div className='flex justify-between' />
          <SimulacionOnboarding data={data} multiplo30={multiplo30} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className='!w-full !bg-[#6469F2] !text-white'>
          Simulá tu inversión
        </Button>
      </DrawerTrigger>
      <DrawerContent className='h-[560px]'>
        <SimulacionOnboarding data={data} multiplo30={multiplo30} />
      </DrawerContent>
    </Drawer>
  );
}
