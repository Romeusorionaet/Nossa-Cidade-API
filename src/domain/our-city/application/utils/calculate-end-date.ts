import { BillingCycleEnum } from '../../enterprise/entities/enums/billing-cycle';

interface Props {
  startDate: Date;
  billingCycle: BillingCycleEnum;
}

export function calculateEndDate({ billingCycle, startDate }: Props): Date {
  const endDate = new Date(startDate);

  if (billingCycle === BillingCycleEnum.MONTHLY) {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (billingCycle === BillingCycleEnum.ANNUAL) {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  return endDate;
}
