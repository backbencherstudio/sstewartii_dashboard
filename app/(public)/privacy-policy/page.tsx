import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: August 3, 2026</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to ATLISS (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). ATLISS connects users to local food vendors, such as food trucks and small eateries, through our mobile application and website (https://atliss.io/). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <p className="mb-2">We may collect information about you in a variety of ways, including:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              <strong>Personal Data:</strong> Name, email address, phone number (such as 815-814-6116), and account credentials when you register.
            </li>
            <li>
              <strong>Location Data:</strong> Real-time or approximate location data from your device to help you discover nearby food trucks and local eateries.
            </li>
            <li>
              <strong>Transaction Data:</strong> Details regarding orders you place with local vendors through our platform.
            </li>
            <li>
              <strong>Usage Data:</strong> Information automatically collected when interacting with our app or website, such as device information, IP address, and browsing actions.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
          <p className="mb-2">Having accurate information permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you to:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Facilitate account creation and management.</li>
            <li>Connect you with local food vendors and process your food orders.</li>
            <li>Provide location-based recommendations (&quot;Worth the detour&quot;).</li>
            <li>Send you administrative information, updates, and marketing communications.</li>
            <li>Monitor and analyze usage and trends to improve our platform and help small vendors grow.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed to local food vendors to fulfill and process your food orders. We may also share data with service providers who perform services for us, or if required by law to protect our rights or the safety of others. We do not sell your personal data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Security of Your Information</h2>
          <p>
             আমরা use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
          <p className="mb-2">
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-1">
            <p><strong>Company:</strong> Atliss LLC</p>
            <p><strong>Website:</strong> <a href="https://atliss.io/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://atliss.io/</a></p>
            <p><strong>Email:</strong> <a href="mailto:atlissapp@gmail.com" className="text-blue-600 hover:underline">atlissapp@gmail.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:8158146116" className="text-blue-600 hover:underline">815-814-6116</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}