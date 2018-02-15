import React from 'react'
import map from 'lodash/map'
import classnames from 'classnames'
import classes from './MenuBar.module.css'

import Prompt from './Prompt';

const Button = (state, dispatch, refs) => (item, key) => (
  <button
    key={key}
    type="button"
    className={classnames({
      [classes.button]: true,
      [classes.active]: item.active && item.active(state)
    })}
    title={item.title}
    disabled={item.enable && !item.enable(state)}
    onMouseDown={e => {
      e.preventDefault()

      item.run(state, dispatch, refs)
    }}
  >{item.content}</button>
)

class MenuBar extends React.Component {
  static defaultProps = {
    prompts: []
  };

  renderPrompt(prompt, key) {
    let promptProps = prompt.props || {},
        PromptComponent = prompt.component || Prompt,
        promptVisible = this.refs[prompt.reference] ? this.refs[prompt.reference].state.show : false;

    return (
      <div key={key} className={classnames({
        'prompt': true,
        'active': promptVisible
      })}>
        <PromptComponent ref={prompt.reference} {...promptProps} />
      </div>
    );
  }

  render() {
    let { menu, children, state, dispatch, prompts } = this.props;

    return (
      <div className={classes.bar}>
        {children && (
          <span className={classes.group}>
            {children}
          </span>
        )}

        {map(menu, (item, key) => (
          <span key={key} className={classes.group}>
            {map(item, Button(state, dispatch, this.refs))}
          </span>
        ))}

        {prompts.map(this.renderPrompt.bind(this))}
      </div>
    )
  }
}

export default MenuBar
