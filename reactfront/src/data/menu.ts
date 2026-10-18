export type MenuItem = {
  key: string
  permissionId: number
  path: string
}

export type MenuSection = {
  key: string
  titleKey: string
  items: MenuItem[]
}

export const menuSections: MenuSection[] = [
  {
    key: 'contabilidad',
    titleKey: 'menu.contabilidad',
    items: [
      { key: 'menu.contabilidad.asientos', permissionId: 13, path: '/dashboard/asientos' },
      { key: 'menu.contabilidad.libro_diario', permissionId: 14, path: '/dashboard/libro-diario' },
      { key: 'menu.contabilidad.resultados', permissionId: 15, path: '/dashboard/resultados' },
      { key: 'menu.contabilidad.plan_cuentas', permissionId: 16, path: '/dashboard/plan-de-cuentas' },
      { key: 'menu.contabilidad.nueva_cuenta', permissionId: 17, path: '/dashboard/nueva-cuenta' },
      { key: 'menu.contabilidad.libro_mayor', permissionId: 18, path: '/dashboard/libro-mayor' },
    ],
  },
  {
    key: 'almacenes',
    titleKey: 'menu.almacenes',
    items: [
      { key: 'menu.almacenes.nuevo_movimiento_producto', permissionId: 19, path: '/dashboard/nuevo-movimiento-producto' },
      { key: 'menu.almacenes.nuevo_movimiento_material_indirecto', permissionId: 20, path: '/dashboard/nuevo-movimiento-material-indirecto' },
      { key: 'menu.almacenes.lista_movimientos_prod_ingrd', permissionId: 21, path: '/dashboard/lista-movimientos-prod-ingrd' },
      { key: 'menu.almacenes.lista_mov_materiales_indirectos', permissionId: 22, path: '/dashboard/lista-mov-materiales-indirectos' },
      { key: 'menu.almacenes.stock_general', permissionId: 23, path: '/dashboard/stock-general' },
      { key: 'menu.almacenes.precio_insumo', permissionId: 44, path: '/dashboard/precio-insumo' },
    ],
  },
  {
    key: 'consignaciones',
    titleKey: 'menu.consignaciones',
    items: [
      { key: 'menu.consignaciones.consignaciones', permissionId: 24, path: '/dashboard/consignaciones' },
      { key: 'menu.consignaciones.nuevo_consignatario', permissionId: 25, path: '/dashboard/nuevo-consignatario' },
      { key: 'menu.consignaciones.ultimos_movimientos', permissionId: 26, path: '/dashboard/ultimos-movimientos' },
      { key: 'menu.consignaciones.ultimos_pagos', permissionId: 27, path: '/dashboard/ultimos-pagos' },
      { key: 'menu.consignaciones.lista_consignatarios', permissionId: 28, path: '/dashboard/lista-consignatarios' },
    ],
  },
  {
    key: 'gerencial',
    titleKey: 'menu.gerencial',
    items: [
      { key: 'menu.gerencial.consulta_ventas_producto_pagadas', permissionId: 29, path: '/dashboard/consulta-ventas-x-producto-pagadas' },
      { key: 'menu.gerencial.consulta_ventas_producto_salidas', permissionId: 38, path: '/dashboard/consulta-ventas-x-producto-salidas' },
      { key: 'menu.gerencial.presupuesto', permissionId: 30, path: '/dashboard/presupuesto' },
      { key: 'menu.gerencial.ahorro_vs_gasto', permissionId: 31, path: '/dashboard/ahorro-vs-gasto' },
      { key: 'menu.gerencial.farmacorps_mas_salidas_historico', permissionId: 39, path: '/dashboard/farmacorps-mas-salidas-historico' },
      { key: 'menu.gerencial.farmacorps_mas_salidas_60_dias', permissionId: 41, path: '/dashboard/farmacorps-mas-salidas-60-dias' },
      { key: 'menu.gerencial.consignatarios_mayor_stock_sprays', permissionId: 42, path: '/dashboard/consignatarios-mayor-stock-sprays' },
      { key: 'menu.gerencial.salidas_farmacorp_x_mes_2021', permissionId: 43, path: '/dashboard/salidas-farmacorp-x-mes-2021' },
      { key: 'menu.gerencial.pendientes_empresa', permissionId: 37, path: '/dashboard/pendientes-empresa' },
    ],
  },
  {
    key: 'apiario',
    titleKey: 'menu.apiario',
    items: [
      { key: 'menu.apiario.nueva_bitacora', permissionId: 32, path: '/dashboard/nueva-bitacora' },
      { key: 'menu.apiario.ver_bitacora', permissionId: 33, path: '/dashboard/ver-bitacora' },
      { key: 'menu.apiario.pendientes_apiario', permissionId: 35, path: '/dashboard/pendientes-apiario' },
      { key: 'menu.apiario.listado_posiciones', permissionId: 36, path: '/dashboard/listado-posiciones' },
      { key: 'menu.apiario.reporte_historia_posiciones', permissionId: 45, path: '/dashboard/reporte-historia-posiciones' },
      { key: 'menu.apiario.reporte_historia_posiciones_vivas', permissionId: 46, path: '/dashboard/reporte-historia-posiciones-vivas' },
      { key: 'menu.apiario.reporte_ultima_revision', permissionId: 47, path: '/dashboard/reporte-ultima-revision' },
      { key: 'menu.apiario.reporte_cosechas', permissionId: 48, path: '/dashboard/reporte-cosechas' },
      { key: 'menu.apiario.mapa_apiarios', permissionId: 49, path: '/dashboard/mapa-apiarios' },
    ],
  },
]

export const allMenuItems = menuSections.flatMap((section) => section.items)
