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
      { key: 'menu.contabilidad.asientos', permissionId: 101, path: '/dashboard/asientos' },
      { key: 'menu.contabilidad.libro_diario', permissionId: 102, path: '/dashboard/libro-diario' },
      { key: 'menu.contabilidad.resultados', permissionId: 103, path: '/dashboard/resultados' },
      { key: 'menu.contabilidad.plan_cuentas', permissionId: 104, path: '/dashboard/plan-de-cuentas' },
      { key: 'menu.contabilidad.nueva_cuenta', permissionId: 105, path: '/dashboard/nueva-cuenta' },
      { key: 'menu.contabilidad.libro_mayor', permissionId: 106, path: '/dashboard/libro-mayor' },
    ],
  },
  {
    key: 'almacenes',
    titleKey: 'menu.almacenes',
    items: [
      { key: 'menu.almacenes.nuevo_movimiento_producto', permissionId: 201, path: '/dashboard/nuevo-movimiento-producto' },
      { key: 'menu.almacenes.nuevo_movimiento_material_indirecto', permissionId: 202, path: '/dashboard/nuevo-movimiento-material-indirecto' },
      { key: 'menu.almacenes.lista_movimientos_prod_ingrd', permissionId: 203, path: '/dashboard/lista-movimientos-prod-ingrd' },
      { key: 'menu.almacenes.lista_mov_materiales_indirectos', permissionId: 204, path: '/dashboard/lista-mov-materiales-indirectos' },
      { key: 'menu.almacenes.stock_general', permissionId: 205, path: '/dashboard/stock-general' },
      { key: 'menu.almacenes.precio_insumo', permissionId: 206, path: '/dashboard/precio-insumo' },
    ],
  },
  {
    key: 'consignaciones',
    titleKey: 'menu.consignaciones',
    items: [
      { key: 'menu.consignaciones.consignaciones', permissionId: 301, path: '/dashboard/consignaciones' },
      { key: 'menu.consignaciones.nuevo_consignatario', permissionId: 302, path: '/dashboard/nuevo-consignatario' },
      { key: 'menu.consignaciones.ultimos_movimientos', permissionId: 303, path: '/dashboard/ultimos-movimientos' },
      { key: 'menu.consignaciones.ultimos_pagos', permissionId: 304, path: '/dashboard/ultimos-pagos' },
      { key: 'menu.consignaciones.lista_consignatarios', permissionId: 305, path: '/dashboard/lista-consignatarios' },
    ],
  },
  {
    key: 'gerencial',
    titleKey: 'menu.gerencial',
    items: [
      { key: 'menu.gerencial.consulta_ventas_producto_pagadas', permissionId: 401, path: '/dashboard/consulta-ventas-x-producto-pagadas' },
      { key: 'menu.gerencial.consulta_ventas_producto_salidas', permissionId: 402, path: '/dashboard/consulta-ventas-x-producto-salidas' },
      { key: 'menu.gerencial.presupuesto', permissionId: 403, path: '/dashboard/presupuesto' },
      { key: 'menu.gerencial.ahorro_vs_gasto', permissionId: 404, path: '/dashboard/ahorro-vs-gasto' },
      { key: 'menu.gerencial.farmacorps_mas_salidas_historico', permissionId: 405, path: '/dashboard/farmacorps-mas-salidas-historico' },
      { key: 'menu.gerencial.farmacorps_mas_salidas_60_dias', permissionId: 406, path: '/dashboard/farmacorps-mas-salidas-60-dias' },
      { key: 'menu.gerencial.consignatarios_mayor_stock_sprays', permissionId: 407, path: '/dashboard/consignatarios-mayor-stock-sprays' },
      { key: 'menu.gerencial.salidas_farmacorp_x_mes_2021', permissionId: 408, path: '/dashboard/salidas-farmacorp-x-mes-2021' },
      { key: 'menu.gerencial.pendientes_empresa', permissionId: 409, path: '/dashboard/pendientes-empresa' },
    ],
  },
  {
    key: 'apiario',
    titleKey: 'menu.apiario',
    items: [
      { key: 'menu.apiario.nueva_bitacora', permissionId: 501, path: '/dashboard/nueva-bitacora' },
      { key: 'menu.apiario.ver_bitacora', permissionId: 502, path: '/dashboard/ver-bitacora' },
      { key: 'menu.apiario.pendientes_apiario', permissionId: 503, path: '/dashboard/pendientes-apiario' },
      { key: 'menu.apiario.listado_posiciones', permissionId: 504, path: '/dashboard/listado-posiciones' },
      { key: 'menu.apiario.reporte_historia_posiciones', permissionId: 505, path: '/dashboard/reporte-historia-posiciones' },
      { key: 'menu.apiario.reporte_historia_posiciones_vivas', permissionId: 506, path: '/dashboard/reporte-historia-posiciones-vivas' },
      { key: 'menu.apiario.reporte_ultima_revision', permissionId: 507, path: '/dashboard/reporte-ultima-revision' },
      { key: 'menu.apiario.reporte_cosechas', permissionId: 508, path: '/dashboard/reporte-cosechas' },
      { key: 'menu.apiario.mapa_apiarios', permissionId: 509, path: '/dashboard/mapa-apiarios' },
    ],
  },
]

export const allMenuItems = menuSections.flatMap((section) => section.items)
