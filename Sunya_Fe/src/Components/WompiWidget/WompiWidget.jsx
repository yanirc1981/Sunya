import { useEffect } from 'react';

const WompiWidget = ({
  productPriceInCents,
  reference,
  publicKey,
  signature,
  Email,
  Name,
  Phone,
  Address,
  Order,
  Municipio,
  Departamento,
}) => {
  useEffect(() => {
    // Verifica si productPriceInCents está presente y es un número antes de usarlo
    if (
      typeof productPriceInCents !== 'undefined' &&
      typeof productPriceInCents === 'number'
    ) {
      const script = document.createElement('script');
      script.src = 'https://checkout.wompi.co/widget.js';
      script.setAttribute('data-render', 'button');
      script.setAttribute('data-public-key', publicKey);
      script.setAttribute('data-currency', 'COP');
      script.setAttribute(
        'data-amount-in-cents',
        productPriceInCents.toString()
      );
      script.setAttribute('data-reference', reference);
      script.setAttribute('data-signature:integrity', signature);
      script.setAttribute('data-redirect-url', 'https://www.lacteos7maravillas.com/');
      script.setAttribute('data-customer-data:email', Email);
      script.setAttribute('data-customer-data:full-name', Name);
      script.setAttribute('data-customer-data:phone-number', Phone.toString());
      script.setAttribute('data-customer-data:phone-number-prefix', '+57');
      script.setAttribute(
        'data-shipping-address:address-line-1',
        Address.toString()
      );
      script.setAttribute(
        'data-shipping-address:address-line-2',
        Order.toString()
      );

      script.setAttribute('data-shipping-address:country', 'CO');
      script.setAttribute('data-shipping-address:city', Municipio);
      script.setAttribute(
        'data-shipping-address:phone-number',
        Phone.toString()
      );
      script.setAttribute(
        'data-shipping-address:region',
        Departamento
      );
      
      const wompiWidgetContainer = document.querySelector(
        '#wompiWidgetContainer'
      );
      if (wompiWidgetContainer) {
        wompiWidgetContainer.appendChild(script);
      }

      return () => {
        if (wompiWidgetContainer) {
          wompiWidgetContainer.removeChild(script);
        }
      };
    } else {
      // Manejo de la ausencia o tipo incorrecto de productPriceInCents
      console.error(
        'productPriceInCents no está presente o no es un número válido'
      );
    }
  }, [
    productPriceInCents,
    reference,
    publicKey,
    signature,
    Email,
    Name,
    Phone,
    Address,
    Order,
    Municipio,
    Departamento,
  ]);

  return <div id="wompiWidgetContainer"></div>;
};

export default WompiWidget;
