import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import SmallSelector from '../../common/SmallSelector';
import style from './style';

const levelValues = Array(100).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));
const qualityLevelValues = Array(5).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

class StatusInfoBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: props.default.level,
      qualityLevel: props.default.qualityLevel,
    };
  }

  buildRow = (label, value, maxValue, color) => {
    const { classes } = this.props;
    const statusRate = Math.min(1, value / maxValue) * 100;
    const statusBackground = {
      background: `linear-gradient(to right, ${color} ${statusRate}%, transparent ${statusRate}%)`,
    };
    if (typeof value === 'undefined' || value === null) {
      return undefined;
    }
    return [
      <div key="row" className={classes.infoRow}>
        <div className={classes.rowTitle}>{label}</div>
        <div
          className={classes.rowTitle}
          style={{
            textAlign: 'right',
            paddingRight: '20px',
          }}
        >
          {`${Number(value).toFixed(1)}%`}
        </div>
        <div className={classes.graph} style={statusBackground} />
      </div>,
    ];
  };

  handleLevelChange = (event) => {
    this.setState({ level: event.target.value }, () => {
      const { handler } = this.props;
      const { level, qualityLevel } = this.state;
      handler(level, qualityLevel);
    });
  }

  handleQualityLevelChange = (event) => {
    this.setState({ qualityLevel: event.target.value }, () => {
      const { handler } = this.props;
      const { level, qualityLevel } = this.state;
      handler(level, qualityLevel);
    });
  }

  render() {
    const {
      classes,
      t,
      stats,
      grow,
    } = this.props;
    const { level, qualityLevel } = this.state;
    return (
      <div className={classes.infoBox}>
        <div className={classes.title}>
          <div className={classes.titleName}>
            {t('PageMessage.Status')}
          </div>
          <div className={classes.selectorLabel}>
            {t('Stat.level')}
          </div>
          <SmallSelector
            className={classes.selector}
            values={levelValues}
            selected={level}
            onChange={this.handleLevelChange}
          />
          <div className={classes.selectorLabel}>
            {t('Stat.rarity')}
          </div>
          <SmallSelector
            className={classes.selector}
            values={qualityLevelValues}
            selected={qualityLevel}
            onChange={this.handleQualityLevelChange}
          />
        </div>
        {this.buildRow(t('Stat.pow'), stats.pow, 55, '#00b8d4')}
        {this.buildRow(t('Stat.dodge'), stats.dodge, 88, '#00c853')}
        {this.buildRow(t('Stat.armor'), stats.armor, 25, '#d50000')}
        {this.buildRow(t('Stat.critDmg'), stats.critDmg, 40, '#ff6d00')}
        {this.buildRow(t('Stat.hit'), stats.hit, 90, '#ffd600')}
        {this.buildRow(t('Stat.grow'), grow, 320, '#2962ff')}
      </div>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(StatusInfoBox);
