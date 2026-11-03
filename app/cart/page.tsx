import Container from "@/src/components/ui/container";
import CartContent from "@/src/components/cart/CartContent";
import { Breadcrumbs } from "@heroui/react";
import Breadcrumb from "@/src/components/productView/Breadcrumb";

function CartPage() {
  return (
    <Container>
      <div className="px-6 py-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "#" },
          ]}
        />
        <h1 className="text-4xl font-black mt-6">YOUR CART</h1>
        <CartContent />
      </div>
    </Container>
  );
}

export default CartPage;
