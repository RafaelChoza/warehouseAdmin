import { useEffect, useState } from "react"
import type { ClosedOrderType } from "../Types"
import getClosedOrders from "../service/getClosedOrders"


export default function ClosedOrders() {

    const [closedOrders, setClosedOrders] = useState<ClosedOrderType[]>([])

    useEffect(() => {
        getClosedOrders().then(data => {
          if(data) {
            setClosedOrders(data)
            console.log("datos de closedOrders", data)
          }
        })
    }, [])

  return (
    <div>
        
    </div>
  )
}
