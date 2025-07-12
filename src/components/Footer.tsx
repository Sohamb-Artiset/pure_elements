import { Facebook, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#97a07a] text-white font-[Montserrat] text-sm pt-10">
      <div className="container mx-auto px-8 py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Information */}
          <div className="space-y-2">
            <h4 className="text-base font-bold mb-2">Information</h4>
            <ul className="space-y-1">
              <li><a href="#" className="font-normal" style={{fontFamily: 'Montserrat, sans-serif', fontStyle: 'normal', fontWeight: 400, color: 'rgb(255,255,255)', fontSize: '13px', lineHeight: '19px'}}>About Us</a></li>
              <li><a href="#" className="font-normal" style={{fontFamily: 'Montserrat, sans-serif', fontStyle: 'normal', fontWeight: 400, color: 'rgb(255,255,255)', fontSize: '13px', lineHeight: '19px'}}>Our Stores</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-2">
            <h4 className="text-base font-bold mb-2">Support</h4>
            <ul className="space-y-1">
              <li><a href="#" className="font-normal" style={{fontFamily: 'Montserrat, sans-serif', fontStyle: 'normal', fontWeight: 400, color: 'rgb(255,255,255)', fontSize: '13px', lineHeight: '19px'}}>My Account</a></li>
              <li><a href="#" className="font-normal" style={{fontFamily: 'Montserrat, sans-serif', fontStyle: 'normal', fontWeight: 400, color: 'rgb(255,255,255)', fontSize: '13px', lineHeight: '19px'}}>Terms & Conditions</a></li>
              <li><a href="#" className="font-normal" style={{fontFamily: 'Montserrat, sans-serif', fontStyle: 'normal', fontWeight: 400, color: 'rgb(255,255,255)', fontSize: '13px', lineHeight: '19px'}}>Privacy Policy</a></li>
              <li><a href="#" className="font-normal" style={{fontFamily: 'Montserrat, sans-serif', fontStyle: 'normal', fontWeight: 400, color: 'rgb(255,255,255)', fontSize: '13px', lineHeight: '19px'}}>Payment Policy</a></li>
              <li><a href="#" className="font-normal" style={{fontFamily: 'Montserrat, sans-serif', fontStyle: 'normal', fontWeight: 400, color: 'rgb(255,255,255)', fontSize: '13px', lineHeight: '19px'}}>Shipping and Delivery</a></li>
              <li><a href="#" className="font-normal" style={{fontFamily: 'Montserrat, sans-serif', fontStyle: 'normal', fontWeight: 400, color: 'rgb(255,255,255)', fontSize: '13px', lineHeight: '19px'}}>Refund and Cancellation</a></li>
            </ul>
          </div>

          {/* Office Address */}
          <div className="space-y-2">
            <h4 className="text-base font-bold mb-2">Office Address</h4>
            <div className="text-xs font-medium">
              <div className="mb-2">
                <span className="font-bold">Corporate Office</span><br />
                Shree Sanjeevan Wellness Solutions.<br />
                Behind Aaimata Mandir,<br />
                Near Gangadham Chowk.<br />
                Bibwewadi. Pune - 37
              </div>
              <div>
                <span className="font-bold">Mahabaleshwar Office</span><br />
                Pure Elements Wellness Solutions.<br />
                Main Market. Mahabaleshwar – 412806
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h4 className="text-base font-bold mb-2">Contact info</h4>
            <div className="text-xs font-medium">
              <div className="mb-2">
                <span className="font-bold">Customer Support:</span><br />
                +91 9021099099
              </div>
              <div className="mb-2">
                <span className="font-bold">WhatsApp:</span><br />
                +91 9021099099
              </div>
              <div>
                <span className="font-bold">Email:</span><br />
                customercare@pureelements.in
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/30 mt-6 mb-2"></div>

        {/* Bottom Row: Social, Payment, Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Social */}
          <div className="md:flex-1">
            <div className="font-bold text-sm">Follow us</div>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="bg-white/90 rounded p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M12 8.4A3.6 3.6 0 1 0 12 15.6 3.6 3.6 0 0 0 12 8.4Zm0 5.9A2.3 2.3 0 1 1 12 9.7a2.3 2.3 0 0 1 0 4.6Zm4.5-6.1a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM21 7.2a5.1 5.1 0 0 0-1.4-3.6A5.1 5.1 0 0 0 16 2.2C14.7 2 9.3 2 8 2.2A5.1 5.1 0 0 0 4.4 3.6 5.1 5.1 0 0 0 3 7.2C2.8 8.5 2.8 13.5 3 14.8a5.1 5.1 0 0 0 1.4 3.6A5.1 5.1 0 0 0 8 21.8c1.3.2 6.7.2 8 0a5.1 5.1 0 0 0 3.6-1.4A5.1 5.1 0 0 0 21 16.8c.2-1.3.2-6.3 0-7.6ZM19.2 19.2a3.1 3.1 0 0 1-2.2.9c-1.2.1-5.1.1-6.3 0a3.1 3.1 0 0 1-2.2-.9 3.1 3.1 0 0 1-.9-2.2c-.1-1.2-.1-5.1 0-6.3a3.1 3.1 0 0 1 .9-2.2 3.1 3.1 0 0 1 2.2-.9c1.2-.1 5.1-.1 6.3 0a3.1 3.1 0 0 1 2.2.9 3.1 3.1 0 0 1 .9 2.2c.1 1.2.1 5.1 0 6.3a3.1 3.1 0 0 1-.9 2.2Z" fill="#97a07a"/></svg></a>
              <a href="#" aria-label="Facebook" className="bg-white/90 rounded p-2"><Facebook className="w-6 h-6 text-[#97a07a]" /></a>
              <a href="#" aria-label="YouTube" className="bg-white/90 rounded p-2"><Youtube className="w-6 h-6 text-[#97a07a]" /></a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="md:flex-1 md:flex md:justify-end">
            <div className="flex flex-col items-center md:items-end">
              <div className="font-bold text-sm">Payment Methods</div>
              <div className="bg-white rounded p-2 flex items-center justify-center md:justify-end">
                <img src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/footer//imgi_246_pay-us-600x66.jpg" alt="Payment Methods" className="h-8 w-auto max-w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs font-bold mt-4">
          © 2025 Pure Elements. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
