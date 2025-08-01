import { ContractPOSrvItem } from '../entities/contractPOSrvItem.entity';

export function mapContractPOSrvItemData(
  body: any,
): Partial<ContractPOSrvItem> {
  return {
    srvNo: body.SrvNo,
    poItem: body.PoItem,
    poHeader: body.PoHeader,
    asBuild2: body.AsBuild2,
    deletePo: body.DeletePo,
    matlGroupDesc: body.MatlGroupDesc,
    prItem: body.PrItem,
    priceUnit: body.PriceUnit,
    amount: body.Amount,
    provisionRate: body.ProvisionRate,
    srvType: body.SrvType,
    currency: body.Currency,
    network: body.Network,
    activityNumber: body.ActivityNumber,
    asbuildVar: body.AsbuildVar,
    asBuilt: body.AsBuilt,
    changeIndicator: body.ChangeIndicator,
    srvLongText: body.SrvLongText,
    srvStatus: body.SrvStatus,
    status: body.Status,
    txt: body.Txt,
    variationOrder: body.VariationOrder,
    asBuild: body.AsBuild,
    change: body.Change,
    contractualIndicator: body.ContractualIndicator,
    project: body.Project,
    serviceType: body.ServiceType,
    subBoq: body.SubBoq,
    purchDoc: body.PurchDoc,
    servicedesc: body.Servicedesc,
    serviceno: body.Serviceno,
    deleteInd: body.DeleteInd,
    plant: body.Plant,
    matlGroup: body.MatlGroup,
    qty: body.Qty,
    poUnit: body.PoUnit,
    itemCat: body.ItemCat,
    acctasscat: body.Acctasscat,
    shortText: body.ShortText,
    baseUom: body.BaseUom,
    wbsElement: body.WbsElement,
    noLimit: body.NoLimit,
    deliveryDate: body.DeliveryDate,
    longText: body.LongText,
    boq: body.Boq,
    ovfTol: body.OvfTol,
    buildingno: body.Buildingno,
  };
}
