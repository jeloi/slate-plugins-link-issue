import React, {Component} from 'react';
import {createEditor} from 'slate';
import {withHistory} from 'slate-history';
import {Slate, withReact} from 'slate-react';
import {
    BoldPlugin,
    EditablePlugins,
    ELEMENT_LI,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    ItalicPlugin,
    LinkPlugin,
    ListPlugin,
    ParagraphPlugin,
    pipe,
    toggleList,
    UnderlinePlugin,
    unwrapList,
    withAutoformat,
    withLink,
    withList,
} from '@udecode/slate-plugins';

const preFormat = (editor) => unwrapList(editor, {});
const autoformatRules = [
    {
        type: ELEMENT_LI,
        markup: ['*', '-', '+'],
        preFormat,
        format: (editor) => {toggleList(editor, { typeList: ELEMENT_UL });},
    }
]

const pluginOptions = {}

const plugins = [BoldPlugin(), ItalicPlugin(), UnderlinePlugin(),
    ParagraphPlugin(pluginOptions),
    LinkPlugin(pluginOptions),
    ListPlugin(pluginOptions)
];

const withPlugins = [
    withReact,
    withHistory,
    withLink(pluginOptions),
    withList(pluginOptions),
    withAutoformat({
        rules: autoformatRules
    }),
];

export default class EloquentEditor extends Component {

    constructor(props) {
        super(props)
        this.editor = pipe(createEditor(), ...withPlugins)
        this.state = {
            value: [{type: ELEMENT_PARAGRAPH, children: [{text: ''}]}]
        }
    }

    render() {
        const props = this.props
        return (
            <Slate
                editor={this.editor}
                value={this.state.value}
                onChange={newValue => {
                    // Update local state
                    console.log(newValue);
                    this.setState({
                        value: newValue,
                    })
                }}
            >
                <EditablePlugins
                    spellCheck={false}
                    plugins={plugins}
                    placeholder="Capture anything..."
                />
            </Slate>
        );
    }
}
