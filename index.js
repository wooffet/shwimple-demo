import { ShwimplePageBuilder, ShwimpleDocument } from 'shwimple';
import express, { urlencoded } from 'express';
const app = express();

app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const document = ShwimpleDocument.createBoilerplateDocument('Shwimple Demo');
    const headerContentNode = document.createElement('h1', 'shwimple-demo-header-content-1', 'shwimple-demo-header-content');
    headerContentNode.textContent = 'Shwimple - Basic Demo Page - Header';
    const contentNode1 = document.createElement('h2', 'shwimple-demo-content-1', 'shwimple-demo-content');
    contentNode1.textContent = 'Shwimple - Basic Demo Page - Content';
    const contentNode2 = document.createElement('h3', 'shwimple-demo-content-2', 'shwimple-demo-content');
    contentNode2.textContent = 'This is a basic test page demonstrating that Shwimple has been setup correctly! :)';
    document.bodyNode.appendChild(headerContentNode);
    document.bodyNode.appendChild(contentNode1);
    document.bodyNode.appendChild(contentNode2);

    const html = document.getHtmlAsString();

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
});

app.get('/pagebuilder', (req, res) => {
    const builder = new ShwimplePageBuilder('Shwimple Demo - Page Builder');

    const addHeader = (document) => {
        const header = document.createElement('header', 'header');
        header.textContent = 'Shwimple Demo - Page Builder - Header';
        document.bodyNode.appendChild(header);
        return document;
    };

    addHeader.id = 'addHeader';

    const addContent = (document) => {
        const section = document.createElement('section', 'content-section');
        const article = document.createElement('article', 'content');
        article.textContent = 'Shwimple - Page Builder - Content';
        section.appendChild(article);
        document.bodyNode.appendChild(section);
        return document;
    };

    addContent.id = 'addContent';

    builder.addRenderFunction(addHeader);
    builder.addRenderFunction(addContent);

    const html = builder.buildAsString();

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
});

const port = 48080;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});
