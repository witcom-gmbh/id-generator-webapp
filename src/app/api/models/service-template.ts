/* tslint:disable */
export interface ServiceTemplate {
  name: string;
  id?: string;
  type?: 'IS' | 'CF';
  template?: {serviceOwner?: string, serviceType?: string, md?: string};
}
