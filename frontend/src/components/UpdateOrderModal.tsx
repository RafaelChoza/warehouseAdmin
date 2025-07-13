import { useOrdersState } from "../store/ShopState"


export default function UpdateOrderModal() {
    const orders = useOrdersState(state => state.orders)
    const getOrders = useOrdersState(state => state.fetchOrders)


  return (
    <div>
        <h1>Orden: {JSON.stringify(orders)}</h1>
    </div>
  )
}
