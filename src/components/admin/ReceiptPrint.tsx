"use client";

import { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Printer, X, FileText } from "lucide-react";

interface ReceiptPrintProps {
  receipt: {
    id: string;
    receiptNo: string;
    items: string; // JSON: [{ description, quantity, unitPrice, total }]
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
    status: string;
    createdAt: string;
    notes?: string;
    student?: {
      name: string;
      email: string;
      phone?: string;
    };
    project?: {
      title: string;
      category: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

interface ReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status.toLowerCase()) {
    case "paid":
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "overdue":
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
}

export default function ReceiptPrint({
  receipt,
  isOpen,
  onClose,
}: ReceiptPrintProps) {
  const parsedItems: ReceiptItem[] = useMemo(() => {
    try {
      return JSON.parse(receipt.items);
    } catch {
      return [];
    }
  }, [receipt.items]);

  // Inject print styles when dialog opens
  useEffect(() => {
    if (!isOpen) return;

    const styleId = "receipt-print-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @media print {
        /* Hide everything except the receipt */
        body > *:not(#receipt-print-area) {
          display: none !important;
        }

        /* Show the receipt area */
        #receipt-print-area {
          display: block !important;
          position: static !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* Ensure the receipt itself prints correctly */
        .receipt-print-content {
          box-shadow: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 24px !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        /* Make text black on white */
        .receipt-print-content * {
          color: #000 !important;
          background: #fff !important;
          border-color: #000 !important;
        }

        /* Remove shadows */
        .receipt-print-content,
        .receipt-print-content * {
          box-shadow: none !important;
          text-shadow: none !important;
        }

        /* Ensure the orange header elements become dark for print */
        .receipt-logo-mark {
          background: #1a1a1a !important;
          color: #fff !important;
        }

        .receipt-company-name {
          color: #000 !important;
        }

        .receipt-tagline {
          color: #555 !important;
        }

        /* Ensure table borders print */
        .receipt-table th,
        .receipt-table td {
          border-color: #333 !important;
        }

        .receipt-table thead th {
          background: #f5f5f5 !important;
          color: #000 !important;
        }

        /* Badge styling for print */
        .receipt-badge {
          border: 1px solid #333 !important;
          background: #fff !important;
          color: #000 !important;
        }

        /* Hide action buttons when printing */
        .receipt-actions {
          display: none !important;
        }

        /* Full width dialog for print */
        [data-slot="dialog-content"] {
          position: static !important;
          transform: none !important;
          max-width: 100% !important;
          width: 100% !important;
          border: none !important;
          padding: 0 !important;
        }

        [data-slot="dialog-overlay"] {
          display: none !important;
        }

        [data-slot="dialog"] {
          position: static !important;
        }

        [data-slot="dialog-portal"] {
          position: static !important;
        }

        /* Page setup */
        @page {
          margin: 12mm;
          size: auto;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto p-0"
        showCloseButton={false}
      >
        {/* Action buttons - hidden on print */}
        <div className="receipt-actions flex items-center justify-between p-4 pb-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <FileText className="size-5 text-orange-500" />
              Receipt Preview
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Printer className="size-4 mr-1" />
              Print Receipt
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Printable receipt content */}
        <div id="receipt-print-area">
          <div className="receipt-print-content mx-4 mb-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
            {/* === Company Header === */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">
              <div className="flex items-center gap-4">
                {/* Logo Mark */}
                <div className="receipt-logo-mark flex items-center justify-center size-12 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold text-lg shrink-0">
                  CW
                </div>
                <div>
                  <h1 className="receipt-company-name text-2xl font-bold tracking-tight text-white">
                    CYBER WEB
                  </h1>
                  <p className="receipt-tagline text-orange-100 text-xs font-medium tracking-wide uppercase">
                    Empowering Innovation Through Technology
                  </p>
                </div>
              </div>
            </div>

            {/* Company Contact Bar */}
            <div className="bg-orange-50 border-b border-orange-100 px-6 py-2.5">
              <p className="text-xs text-orange-800/70 text-center font-medium">
                Carrefour Etoug-Ebe, Yaounde, Cameroon &nbsp;|&nbsp;
                contact@cyberweb.cm &nbsp;|&nbsp; +237 6XX XXX XXX
              </p>
            </div>

            {/* === Receipt Body === */}
            <div className="px-6 py-5">
              {/* Receipt Title & Meta */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    RECEIPT
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Receipt #{receipt.receiptNo}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <Badge
                    variant={getStatusVariant(receipt.status)}
                    className="receipt-badge"
                  >
                    {receipt.status.charAt(0).toUpperCase() +
                      receipt.status.slice(1)}
                  </Badge>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(receipt.createdAt)}
                  </p>
                </div>
              </div>

              <Separator className="mb-5" />

              {/* Payment Info + Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                {/* Payment Details */}
                <div>
                  <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Payment Details
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Method</span>
                      <span className="font-medium text-gray-800">
                        {receipt.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Receipt No.</span>
                      <span className="font-mono font-medium text-gray-800">
                        {receipt.receiptNo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Client / Student Info */}
                <div>
                  <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {receipt.student ? "Student / Client" : "Client"}
                  </h3>
                  {receipt.student ? (
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-gray-800">
                        {receipt.student.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {receipt.student.email}
                      </p>
                      {receipt.student.phone && (
                        <p className="text-xs text-gray-500">
                          {receipt.student.phone}
                        </p>
                      )}
                      {receipt.project && (
                        <>
                          <div className="pt-1 mt-1 border-t border-dashed border-gray-200">
                            <p className="text-xs text-gray-400">
                              Project:{" "}
                              <span className="text-gray-600 font-medium">
                                {receipt.project.title}
                              </span>
                            </p>
                            <p className="text-xs text-gray-400">
                              Category:{" "}
                              <span className="text-gray-600 font-medium">
                                {receipt.project.category}
                              </span>
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No client info available
                    </p>
                  )}
                </div>
              </div>

              {/* === Items Table === */}
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-5">
                <table className="receipt-table w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="text-center px-3 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-16">
                        Qty
                      </th>
                      <th className="text-right px-3 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-28">
                        Unit Price
                      </th>
                      <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-28">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedItems.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index < parsedItems.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }
                      >
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {item.description}
                        </td>
                        <td className="px-3 py-3 text-center text-gray-600">
                          {item.quantity}
                        </td>
                        <td className="px-3 py-3 text-right text-gray-600 font-mono">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-800 font-semibold font-mono">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                    {parsedItems.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-6 text-center text-gray-400 italic"
                        >
                          No items found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* === Totals === */}
              <div className="flex justify-end mb-5">
                <div className="w-full sm:w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-700 font-mono">
                      {formatCurrency(receipt.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-gray-700 font-mono">
                      {formatCurrency(receipt.tax)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">
                      Grand Total
                    </span>
                    <span className="text-lg font-bold text-orange-600 font-mono">
                      {formatCurrency(receipt.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* === Notes === */}
              {receipt.notes && (
                <div className="mb-5 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Notes
                  </h3>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {receipt.notes}
                  </p>
                </div>
              )}

              <Separator className="mb-5" />

              {/* === Footer === */}
              <div className="text-center space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Thank you for your business!
                </p>
                <p className="text-xs text-gray-400">
                  If you have any questions concerning this receipt, please
                  contact us at{" "}
                  <span className="text-gray-500">contact@cyberweb.cm</span>
                </p>

                <div className="pt-2 border-t border-dashed border-gray-200">
                  <p className="text-[10px] text-gray-300 leading-relaxed">
                    CYBER WEB — Registered in Cameroon. NIF: XXXXXXXXX / NIU:
                    XXXXXXXXX. All transactions are subject to Cameroonian tax
                    regulations. This receipt is computer-generated and is valid
                    without a signature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
