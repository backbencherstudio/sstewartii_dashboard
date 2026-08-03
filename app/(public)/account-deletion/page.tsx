

export default function AccountDeletionPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-2">Account Deletion Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: August 3, 2026</p>

      <div className="space-y-6">
        <div>
          <p>
            ATLISS allows you to permanently delete your account directly from within the application. Once your deletion request is confirmed, your account and associated personal information will be permanently deleted, except where we are required to retain certain records under applicable laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">How to Delete Your Account</h2>
          <ol className="list-decimal list-inside space-y-1 pl-4">
            <li>Sign in to your ATLISS account on the mobile app or website.</li>
            <li>Open the <strong>Settings</strong> or <strong>Account Profile</strong> page.</li>
            <li>Locate and tap the <strong>Delete Account</strong> option.</li>
            <li>Review the confirmation notice.</li>
            <li>Confirm your request to permanently delete your account.</li>
          </ol>
          <p className="mt-2 text-sm text-gray-600">
            If you are unable to access your account, please contact our support team for assistance with identity verification and submitting a manual deletion request.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">What Happens When You Delete Your Account</h2>
          <p>
            When your deletion request is completed, your account will be permanently removed along with your profile information, saved preferences, order history, and other personal information associated with your account.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Information That May Be Retained</h2>
          <p>
            Certain information may be retained where required by applicable law, tax reporting, fraud prevention requirements, dispute resolution, or other legal obligations. Any retained information is securely stored and used only for those strict regulatory purposes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Processing Time</h2>
          <p>
            Most account deletion requests processed in-app take effect immediately. Requests submitted via support are typically completed within 30 days after your identity has been verified. You will receive a confirmation once the deletion has been fully processed.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Important Notice</h2>
          <p className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded text-amber-900">
            <strong>Account deletion is permanent and cannot be undone.</strong> After your account has been deleted, you will no longer be able to access your saved favorite food vendors, past orders, or account data. If you wish to use ATLISS again in the future, you will need to create a new account.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Need Assistance?</h2>
          <p className="mb-4">
            If you cannot access your account or experience any issues with deleting it, please reach out to our support team. We will assist you with identity verification and manually processing your request.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-1">
            <p><strong>Operator:</strong> Atliss LLC</p>
            <p><strong>Website:</strong> <a href="https://atliss.io/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://atliss.io/</a></p>
            <p><strong>Email:</strong> <a href="mailto:atlissapp@gmail.com" className="text-blue-600 hover:underline">atlissapp@gmail.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:8158146116" className="text-blue-600 hover:underline">815-814-6116</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}