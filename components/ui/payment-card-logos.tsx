import Image from "next/legacy/image";
import visaLogo from "../../public/images/payment-logo/visa.png";
import mastercardLogo from "../../public/images/payment-logo/master-card.png";
import applepayLogo from "../../public/images/payment-logo/apple-pay.png";
import paypalLogo from "../../public/images/payment-logo/pay-pal.png";

const cardLogos = [
  { src: visaLogo, alt: "Visa Card", width: 80, height: 60 },
  { src: applepayLogo, alt: "Applepay", width: 80, height: 60 },
  { src: mastercardLogo, alt: "Mastercard", width: 80, height: 60 },
  { src: paypalLogo, alt: "Paypal", width: 80, height: 60 },
];

export const PaymentCardLogos: React.FC = () => {
  return (
    <div className="flex gap-4 items-center">
      {cardLogos.map((logo, index) => (
        <div key={index} className="flex items-center">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            layout="intrinsic"
          />
        </div>
      ))}
    </div>
  );
};
