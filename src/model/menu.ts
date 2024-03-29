export interface MenuItemType {
  /** Nombre del item **/
  name: string;
  /** Url al que redirige */
  url: string;
  /** Icono del item, se muestra al lado del nombre */
  icon: string;
  /** agrega un border-top al item para dividir entre secciones */
  hasTopBorder?: boolean;
}
