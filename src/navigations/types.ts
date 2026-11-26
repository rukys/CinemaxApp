import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Movie } from '../types/tmdb';
import type { FavoriteMovie } from '../types/user';

/** Routes of the bottom tab navigator rendered by `AppBarScreen`. */
export type TabParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  FavoriteScreen: undefined;
  ProfileScreen: undefined;
};

/** Routes of the root stack navigator. */
export type RootStackParamList = {
  SplashScreen: undefined;
  OnboardingScreen: undefined;
  ForgotPassScreen: undefined;
  SignupScreen: undefined;
  SigninScreen: undefined;
  AppBarScreen: NavigatorScreenParams<TabParamList> | undefined;
  ProfileEditScreen: undefined;
  NotificationScreen: undefined;
  MovieListScreen: { movieList: Movie[]; title: string };
  /**
   * A TMDB list item, or a favorite stored in Firestore when opened from
   * the Favorite screen.
   */
  MovieDetailScreen: { movieData: Movie | FavoriteMovie };
  LanguageScreen: undefined;
  CountryScreen: { isFromSignup?: boolean } | undefined;
  WebViewScreen: { url: string };
  PrivacyPolicyScreen: undefined;
  HelpFaqScreen: undefined;
  AboutScreen: undefined;
  ChangePasswordScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
