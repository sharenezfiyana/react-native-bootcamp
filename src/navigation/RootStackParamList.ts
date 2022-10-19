import {IHomeScreen, ITodoListItem} from '../interfaces';

export type RootStackParamList = {
  CounterScreen: undefined;
  FavoriteScreen : undefined;
  TodoListScreen: undefined;
  DetailScreen: {
    item: IHomeScreen;
  };
  HomeScreen: undefined;
};
