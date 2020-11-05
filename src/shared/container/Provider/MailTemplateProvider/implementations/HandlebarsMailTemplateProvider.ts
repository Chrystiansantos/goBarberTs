import handlebars from 'handlebars';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    // sera responsavel por complicar o template com as variaveis
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
