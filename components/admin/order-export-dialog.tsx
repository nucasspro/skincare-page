'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Download, FileText, Package, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export type ExportFormat = 'xlsx' | 'csv' | 'json'
export type ExportReportType = 'all' | 'sales' | 'status' | 'customer' | 'revenue'

interface OrderExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onExport: (params: {
    reportType: ExportReportType
    format: ExportFormat
    startDate?: string
    endDate?: string
    status?: string
  }) => void
  exporting?: boolean
  statusFilter?: string
}

const REPORT_TYPES = [
  { value: 'all', label: 'Tất cả đơn hàng', icon: FileText },
  { value: 'sales', label: 'Báo cáo bán hàng', icon: ShoppingCart },
  { value: 'status', label: 'Báo cáo trạng thái', icon: Package },
  { value: 'customer', label: 'Báo cáo khách hàng', icon: FileText },
  { value: 'revenue', label: 'Báo cáo doanh thu', icon: FileText },
] as const

const FORMATS = [
  { value: 'xlsx', label: 'Excel (.xlsx)' },
  { value: 'csv', label: 'CSV (.csv)' },
  { value: 'json', label: 'JSON (.json)' },
] as const

export function OrderExportDialog({
  open,
  onOpenChange,
  onExport,
  exporting = false,
  statusFilter,
}: OrderExportDialogProps) {
  const [reportType, setReportType] = useState<ExportReportType>('all')
  const [format, setFormat] = useState<ExportFormat>('xlsx')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedStatus, setSelectedStatus] = useState(statusFilter || 'all')

  const handleExport = () => {
    onExport({
      reportType,
      format,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      status: selectedStatus !== 'all' ? selectedStatus : undefined,
    })
  }

  const handleReset = () => {
    setReportType('all')
    setFormat('xlsx')
    setStartDate('')
    setEndDate('')
    setSelectedStatus(statusFilter || 'all')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-neutral-900 flex items-center gap-2">
            <Download className="h-5 w-5 text-[var(--admin-beige)]" />
            Xuất báo cáo đơn hàng
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-600 mt-2">
            Chọn loại báo cáo, định dạng file và các tùy chọn lọc dữ liệu
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Report Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-neutral-900 mb-4 block uppercase tracking-wide">
              Loại báo cáo <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-3">
              {REPORT_TYPES.map((type) => {
                const Icon = type.icon
                const isSelected = reportType === type.value
                return (
                  <Button
                    key={type.value}
                    type="button"
                    variant={isSelected ? undefined : 'outline'}
                    size="sm"
                    onClick={() => {
                      setReportType(type.value as ExportReportType)
                    }}
                    className={`rounded-xl px-4 py-2 h-10 text-sm font-medium cursor-pointer transition-all border-2 shadow-sm hover:shadow-md ${
                      isSelected
                        ? `bg-gradient-to-r from-neutral-200 to-neutral-300 text-neutral-700 border-neutral-400 hover:from-neutral-250 hover:to-neutral-350`
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {type.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-neutral-900 mb-4 block uppercase tracking-wide">
              Định dạng file <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-3">
              {FORMATS.map((fmt) => {
                const isSelected = format === fmt.value
                return (
                  <Button
                    key={fmt.value}
                    type="button"
                    variant={isSelected ? undefined : 'outline'}
                    size="sm"
                    onClick={() => {
                      setFormat(fmt.value as ExportFormat)
                    }}
                    className={`rounded-xl px-4 py-2 h-10 text-sm font-medium cursor-pointer transition-all border-2 shadow-sm hover:shadow-md ${
                      isSelected
                        ? `bg-gradient-to-r from-neutral-200 to-neutral-300 text-neutral-700 border-neutral-400 hover:from-neutral-250 hover:to-neutral-350`
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400'
                    }`}
                  >
                    {fmt.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-neutral-900">Lọc theo thời gian</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="startDate" className="text-xs text-neutral-600 mb-1.5 block">
                  Từ ngày
                </Label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-[var(--admin-neutral-gray)]/50 bg-white text-sm focus:border-[var(--admin-beige)] focus:ring-0 text-neutral-700"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-xs text-neutral-600 mb-1.5 block">
                  Đến ngày
                </Label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || undefined}
                  className="w-full h-10 px-3 rounded-md border border-[var(--admin-neutral-gray)]/50 bg-white text-sm focus:border-[var(--admin-beige)] focus:ring-0 text-neutral-700"
                />
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-3">
            <Label htmlFor="status" className="text-sm font-semibold text-neutral-900">
              Lọc theo trạng thái
            </Label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-[var(--admin-neutral-gray)]/50 bg-white text-sm focus:border-[var(--admin-beige)] focus:ring-0 text-neutral-700"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Đang chờ</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipping">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-end gap-2">
          <Button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="rounded-md bg-[var(--admin-beige)] hover:bg-[var(--admin-beige)]/80 text-neutral-900 font-medium gap-2 border-2 border-[var(--admin-beige)]"
          >
            {exporting ? (
              <>
                <div className="h-4 w-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                Đang xuất...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Xuất báo cáo
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
