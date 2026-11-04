// Generated from rest-contract.json. Run npm run generate:schemas.
import { z } from '@botpress/sdk'

export const DocumentSchema = z.object({
  "id": z.string(),
  "environment": z.enum(["live","test"]),
  "status": z.string(),
  "source": z.string(),
  "filename": z.string(),
  "content_type": z.string(),
  "size_bytes": z.number().int(),
  "sha256": z.string(),
  "page_count": z.number().int(),
  "render_status": z.string(),
  "render_reason": z.union([z.string(), z.null()]),
  "validation": z.record(z.any()),
  "upload_id": z.union([z.string(), z.null()]),
  "created_at": z.string(),
  "expires_at": z.union([z.string(), z.null()]),
  "deleted_at": z.union([z.string(), z.null()])
})

export const PagePreviewSchema = z.object({
  "page_number": z.number().int(),
  "width_px": z.union([z.number().int(), z.null()]),
  "height_px": z.union([z.number().int(), z.null()]),
  "url": z.string()
})

export const DocumentPagesSchema = z.object({
  "document_id": z.string(),
  "page_count": z.number().int(),
  "render_status": z.string(),
  "render_reason": z.union([z.string(), z.null()]),
  "items": z.array(PagePreviewSchema)
})

export const QuoteSchema = z.object({
  "id": z.string(),
  "environment": z.enum(["live","test"]),
  "document_id": z.string(),
  "document_sha256": z.string(),
  "to": z.string(),
  "from": z.union([z.string(), z.null()]).optional(),
  "route": z.string(),
  "document_pages": z.number().int(),
  "cover_pages": z.number().int(),
  "billable_pages": z.number().int(),
  "amount_micro": z.number().int(),
  "currency": z.string(),
  "price_version": z.string(),
  "per_page_micro": z.number().int().optional(),
  "route_label": z.string().optional(),
  "cover": z.union([z.record(z.any()), z.null()]),
  "authorization_required": z.boolean(),
  "warnings": z.array(z.record(z.any())),
  "expires_at": z.string(),
  "expired": z.boolean(),
  "consumed_by_job_id": z.union([z.string(), z.null()]),
  "created_at": z.string()
})

export const FaxJobSchema = z.object({
  "id": z.string(),
  "environment": z.enum(["live","test"]),
  "direction": z.string(),
  "state": z.enum(["queued","active","partial","failed","unknown","delivered"]),
  "failure_code": z.union([z.string(), z.null()]),
  "to": z.string(),
  "from": z.union([z.string(), z.null()]).optional(),
  "route": z.string(),
  "document_id": z.string(),
  "document_sha256": z.string(),
  "transmitted_sha256": z.union([z.string(), z.null()]),
  "quote_id": z.union([z.string(), z.null()]),
  "billable_pages": z.number().int(),
  "cover_pages": z.number().int(),
  "pages_sent": z.number().int(),
  "amount_micro": z.number().int(),
  "captured_micro": z.number().int(),
  "currency": z.string(),
  "provider": z.string(),
  "provider_ref": z.union([z.string(), z.null()]),
  "client_reference": z.union([z.string(), z.null()]),
  "attempt_count": z.number().int(),
  "created_at": z.string(),
  "updated_at": z.string(),
  "completed_at": z.union([z.string(), z.null()]),
  "cancel_requested_at": z.union([z.string(), z.null()]),
  "evidence": z.union([z.record(z.any()), z.null()]).optional()
})

export const FaxJobPageSchema = z.object({
  "items": z.array(FaxJobSchema),
  "next_cursor": z.union([z.string(), z.null()]).optional()
})

export const AttemptSchema = z.object({
  "id": z.string(),
  "fax_job_id": z.string(),
  "attempt_number": z.number().int(),
  "provider": z.string(),
  "provider_ref": z.union([z.string(), z.null()]),
  "status": z.string(),
  "pages_sent": z.number().int(),
  "failure_code": z.union([z.string(), z.null()]),
  "evidence": z.union([z.record(z.any()), z.null()]),
  "error": z.union([z.string(), z.null()]),
  "started_at": z.string(),
  "finished_at": z.union([z.string(), z.null()])
})

export const AttemptPageSchema = z.object({
  "items": z.array(AttemptSchema)
})

export const ApprovalRequestSchema = z.object({
  "id": z.string(),
  "kind": z.enum(["send","help"]),
  "status": z.enum(["pending","approved","rejected","revoked","expired"]),
  "quote_id": z.union([z.string(), z.null()]),
  "bound": z.record(z.any()),
  "message": z.union([z.string(), z.null()]),
  "requested_by": z.string(),
  "decided_by": z.union([z.string(), z.null()]),
  "reason": z.union([z.string(), z.null()]),
  "consumed_by_job_id": z.union([z.string(), z.null()]),
  "created_at": z.string(),
  "expires_at": z.union([z.string(), z.null()]),
  "decided_at": z.union([z.string(), z.null()]),
  "notified": z.union([z.boolean(), z.null()]).optional()
})

export const InboxItemSchema = z.object({
  "id": z.string(),
  "from": z.union([z.string(), z.null()]).optional(),
  "to": z.string(),
  "pages": z.number().int(),
  "status": z.string(),
  "document_id": z.union([z.string(), z.null()]),
  "received_at": z.string(),
  "amount_micro": z.number().int().optional(),
  "note": z.union([z.string(), z.null()]).optional(),
  "environment": z.enum(["live","test"]).optional(),
  "number_id": z.union([z.string(), z.null()]).optional(),
  "project_id": z.union([z.string(), z.null()]).optional(),
  "partial_content": z.boolean().optional(),
  "media_status": z.string().optional(),
  "duration_secs": z.union([z.number().int(), z.null()]).optional(),
  "provider": z.string().optional(),
  "read_at": z.union([z.string(), z.null()]).optional(),
  "expires_at": z.union([z.string(), z.null()]).optional()
})

export const InboxPageSchema = z.object({
  "items": z.array(InboxItemSchema),
  "next_cursor": z.union([z.string(), z.null()]).optional()
})

export const InboxItemDetailSchema = z.object({
  "id": z.string(),
  "from": z.union([z.string(), z.null()]).optional(),
  "to": z.string(),
  "pages": z.number().int(),
  "status": z.string(),
  "document_id": z.union([z.string(), z.null()]),
  "received_at": z.string(),
  "amount_micro": z.number().int().optional(),
  "note": z.union([z.string(), z.null()]).optional(),
  "environment": z.enum(["live","test"]).optional(),
  "number_id": z.union([z.string(), z.null()]).optional(),
  "project_id": z.union([z.string(), z.null()]).optional(),
  "partial_content": z.boolean().optional(),
  "media_status": z.string().optional(),
  "duration_secs": z.union([z.number().int(), z.null()]).optional(),
  "provider": z.string().optional(),
  "read_at": z.union([z.string(), z.null()]).optional(),
  "expires_at": z.union([z.string(), z.null()]).optional(),
  "document": z.union([z.record(z.any()), z.null()]).optional(),
  "text": z.union([z.string(), z.null()]).optional(),
  "extraction_id": z.union([z.string(), z.null()]).optional()
})

export const ExtractionPageSchema = z.object({
  "page": z.number().int(),
  "text": z.string(),
  "confidence": z.number(),
  "language": z.union([z.string(), z.null()]).optional(),
  "status": z.string(),
  "model": z.string(),
  "escalated": z.boolean().optional(),
  "warnings": z.array(z.string()).optional()
})

export const ExtractionSchema = z.object({
  "id": z.string(),
  "kind": z.enum(["extract","classify","summarize"]),
  "status": z.enum(["pending","queued","running","completed","failed"]),
  "environment": z.enum(["live","test"]),
  "document_id": z.string(),
  "inbox_item_id": z.union([z.string(), z.null()]),
  "schema_id": z.union([z.string(), z.null()]),
  "schema": z.union([z.record(z.any()), z.null()]).optional(),
  "options": z.record(z.any()),
  "pages_requested": z.number().int(),
  "pages_processed": z.number().int(),
  "pages_escalated": z.number().int(),
  "document_pages": z.number().int(),
  "confidence": z.union([z.number(), z.null()]),
  "pages": z.array(ExtractionPageSchema),
  "output": z.union([z.record(z.any()), z.null()]),
  "models": z.record(z.any()),
  "price_micro": z.number().int(),
  "provider_cost_micro": z.number().int(),
  "currency": z.string(),
  "error_code": z.union([z.string(), z.null()]),
  "created_by": z.string(),
  "created_at": z.string(),
  "started_at": z.union([z.string(), z.null()]),
  "completed_at": z.union([z.string(), z.null()]),
  "corrections": z.union([z.array(z.record(z.any())), z.null()]).optional()
})

export const ExtractionPageListSchema = z.object({
  "items": z.array(ExtractionSchema),
  "next_cursor": z.union([z.string(), z.null()]).optional()
})

export const CapabilitiesSchema = z.object({
  "environment": z.enum(["live","test"]),
  "provider": z.string(),
  "send": z.boolean(),
  "receive": z.boolean(),
  "numbers": z.boolean(),
  "routes": z.array(z.string()),
  "formats": z.array(z.string()),
  "max_pages": z.number().int(),
  "max_upload_bytes": z.number().int(),
  "price_version": z.string(),
  "rates": z.record(z.any()),
  "scopes": z.array(z.string()),
  "approvals": z.boolean(),
  "limits": z.record(z.number().int())
})

export const MeSchema = z.object({
  "org_id": z.string(),
  "project_id": z.string(),
  "key_id": z.string(),
  "key_prefix": z.string(),
  "environment": z.enum(["live","test"]),
  "scopes": z.array(z.string()),
  "actor": z.string()
})

export const BalanceSchema = z.object({
  "environment": z.enum(["live","test"]),
  "currency": z.string(),
  "available_micro": z.number().int(),
  "held_micro": z.number().int()
})
