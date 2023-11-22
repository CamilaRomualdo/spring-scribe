import { Toaster } from 'react-hot-toast';
import { Books } from "./Books"
import { Header } from "./Header"

export const All =  () => {

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <Header />
      <Books />
    </div>
  )
}