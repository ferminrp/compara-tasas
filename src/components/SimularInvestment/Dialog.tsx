import * as React from 'react';
import { useMediaQuery } from './hooks/use-media-query';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';
import SimulacionOnboarding from './Onboarding';

export default function SimularInversion({ data }) {
  const [open, setOpen] = React.useState(false);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  //   const parsedData = data ? JSON.parse(data) : {};

  // Si el usuario esta en escritorio, mostar Modal
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='!w-full !bg-[#6469F2] !text-white'>
            Simulá tu inversión
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <div className='flex justify-between'></div>

          <SimulacionOnboarding data={data} />
        </DialogContent>
      </Dialog>
    );
  }

  // Si el usuario esta en mobile, mostrar drawer
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className='!w-full !bg-[#6469F2] !text-white'>
          Simulá tu inversión
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <SimulacionOnboarding data={data} />
      </DrawerContent>
    </Drawer>
  );
}
