"use client";

const users = [
  {
    id: "1234",
    name: "Sahana Publishers",
    stalls: "A12, B3",
    qr: "https://1/1234.png",
    contact: "0711234567",
  },
  {
    id: "3456",
    name: "Book House",
    stalls: "A12, B3",
    qr: "https://1/3456.png",
    contact: "0711234567",
  },
  {
    id: "7890",
    name: "Readers Corner",
    stalls: "C4",
    qr: "https://1/7890.png",
    contact: "0711234567",
  },
];

export default function UsersPage() {
  return (
    <section className="p-12">
      <h3 className="text-center text-2xl font-serif mb-8">Registered Users</h3>

      <div className="max-w-4xl mx-auto rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(255,122,0,0.12)] overflow-auto">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr>
              <th className="pb-4">User ID</th>
              <th className="pb-4">User Name</th>
              <th className="pb-4">Stalls</th>
              <th className="pb-4">QR Code Url</th>
              <th className="pb-4">Contact</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-3">{u.id}</td>
                <td className="py-3">{u.name}</td>
                <td className="py-3">{u.stalls}</td>
                <td className="py-3 text-blue-600 underline">{u.qr}</td>
                <td className="py-3">{u.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
