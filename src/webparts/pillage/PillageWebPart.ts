import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PillageWebPartStrings';
import Pillage from './components/Pillage';
import { IPillageProps } from './components/IPillageProps';

export interface IPillageWebPartProps {
  useremail: string;
}

export default class PillageWebPart extends BaseClientSideWebPart<IPillageWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPillageProps > = React.createElement(
      Pillage,
      {
        useremail: this.context.pageContext.user.email.toLocaleLowerCase()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
