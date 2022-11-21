import s from './Welcome.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
export const FourthActions = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake}/> 
    <RouterLink to="/start" >完成</RouterLink>
    <SkipFeatures /> 
  </div>
)

FourthActions.displayName = 'ForthActions'