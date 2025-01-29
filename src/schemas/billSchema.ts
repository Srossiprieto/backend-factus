import { z } from 'zod';

export const billSchema = z.object({
  numbering_range_id: z.number(),
  reference_code: z.string(),
  observation: z.string().optional(),
  payment_form: z.string(),
  payment_due_date: z.string(),
  payment_method_code: z.string(),
  billing_period: z.object({
    start_date: z.string(),
    start_time: z.string(),
    end_date: z.string(),
    end_time: z.string()
  }),
  customer: z.object({
    identification: z.string(),
    dv: z.string().optional(),
    company: z.string().optional(),
    trade_name: z.string().optional(),
    names: z.string(),
    address: z.string(),
    email: z.string(),
    phone: z.string(),
    legal_organization_id: z.string(),
    tribute_id: z.string(),
    identification_document_id: z.string(),
    municipality_id: z.string()
  }),
  items: z.array(z.object({
    code_reference: z.string(),
    name: z.string(),
    quantity: z.number(),
    discount_rate: z.number(),
    price: z.number(),
    tax_rate: z.string(),
    unit_measure_id: z.number(),
    standard_code_id: z.number(),
    is_excluded: z.number(),
    tribute_id: z.number(),
    withholding_taxes: z.array(z.object({
      code: z.string(),
      withholding_tax_rate: z.string()
    })).optional()
  }))
});

