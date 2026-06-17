# Graph Report - basket-places  (2026-06-16)

## Corpus Check
- 359 files · ~143,482 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1394 nodes · 2576 edges · 99 communities (75 shown, 24 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2435a64e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]
- [[_COMMUNITY_Community 94|Community 94]]
- [[_COMMUNITY_Community 95|Community 95]]
- [[_COMMUNITY_Community 101|Community 101]]
- [[_COMMUNITY_Community 106|Community 106]]
- [[_COMMUNITY_Community 109|Community 109]]

## God Nodes (most connected - your core abstractions)
1. `fromSupabaseError()` - 30 edges
2. `createClient()` - 28 edges
3. `handleServiceError()` - 27 edges
4. `ok()` - 25 edges
5. `fail()` - 25 edges
6. `useContributionStore` - 23 edges
7. `useCustomNavigation()` - 22 edges
8. `getCurrentUser()` - 21 edges
9. `useModalStore` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `AuthProvider()` --calls--> `useCustomNavigation()`  [EXTRACTED]
  app/(auth)/components/AuthProvider.tsx → lib/hooks/useNavigation.ts
- `ProtectedWrapper()` --calls--> `useCustomNavigation()`  [EXTRACTED]
  app/(auth)/components/ProtectedWrapper.tsx → lib/hooks/useNavigation.ts
- `sendLoginCode()` --calls--> `fromSupabaseError()`  [EXTRACTED]
  app/(auth)/database/dbQueries.browser.ts → lib/errors/database.ts
- `logout()` --calls--> `fromSupabaseError()`  [EXTRACTED]
  app/(auth)/database/dbQueries.browser.ts → lib/errors/database.ts
- `setSession()` --calls--> `fromSupabaseError()`  [EXTRACTED]
  app/(auth)/database/dbQueries.browser.ts → lib/errors/database.ts

## Import Cycles
- None detected.

## Communities (99 total, 24 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (72): deleteCommunity(), getCommunitiesForMap(), getProfileCommunities(), registerCommunity(), updateCommunity(), createCommunityReview(), deleteAccount(), getCommunityReviews() (+64 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (48): CommentAnalysisError, CommentAnalysisRaw, CommentAnalysisResponse, CommentAnalysisResult, validateCommentAnalysis(), analyzeCommunity(), getManualCourtAnalysis(), Props (+40 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (47): CategoriesListControllers(), CategoriesListControllersProps, CategoryCardDisplay(), CategoryCardInfoProps, GENDER_DETAILS, getAgeRange(), CategoriesInfoProps, Props (+39 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (21): CloseButton(), CloseButtonProps, ReviewForm(), ReviewItemProps, Props, Schedule, ItemContainer(), Props (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): RoundImageInput(), EditProfileBtn(), EditProfileForm(), useUpdateProfile(), UseUpdateProfileReturn, compressImage(), CompressionOptions, ImageCompressionError (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (9): CodeVerificationForm(), CodeVerificationFormProps, EmailForm(), EmailFormProps, ExpiredCodeMessage(), ExpiredCodeMessageProps, FormContentProps, OtpInputProps (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (19): AuthShellData, getAuthShellData(), isAuthRelatedError(), mapToAuthError(), iceland, metadata, oxanium, RootLayout() (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (16): ArrowUpIcon(), ClubIcon(), CommentsIcon(), DetailsIcon(), EditIcon(), EditProfile(), GearIcon(), GenderIcon() (+8 more)

### Community 8 - "Community 8"
Cohesion: 0.04
Nodes (47): dependencies, leaflet, motion, next, next-themes, react, react-dom, react-leaflet (+39 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (17): AuthContext, AuthContextType, AuthProvider(), AuthShell(), AuthShellProps, logout(), onAuthStateChange(), setSession() (+9 more)

### Community 10 - "Community 10"
Cohesion: 0.05
Nodes (36): 1. Edición vs Creación, 2. Cleanup al Desmontar, 3. Imágenes: File vs String, 4. ConditionalStep (Solo Pickup), 5. Redirección Automática, Auto-invoke Skills, Contexto, createCommunity.ts (+28 more)

### Community 11 - "Community 11"
Cohesion: 0.13
Nodes (17): NavigationButtonProps, DefaultUserImage(), DefaultUserImageProps, IconSize, IconSize, UserAvatar(), UserAvatarProps, Button (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.13
Nodes (17): CommunityInsertData, CommunityUpdateData, categorySchema, coordinatesSchema, imageSchema, scheduleSchema, serviceSchema, RegisterCommunityFormData (+9 more)

### Community 13 - "Community 13"
Cohesion: 0.07
Nodes (27): Auto-invoke Skills, avatars, Browser Client (sync), Búsqueda por radio (5km), Clientes, Communities, community-images, Contexto (+19 more)

### Community 14 - "Community 14"
Cohesion: 0.07
Nodes (26): AI Analysis: analyzeUserComment, Auto-invoke Skills, Componentes de UI, Contexto, Crear Review, createCommunityReview, Data Flow Completo, Data Types (+18 more)

### Community 15 - "Community 15"
Cohesion: 0.07
Nodes (26): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+18 more)

### Community 16 - "Community 16"
Cohesion: 0.07
Nodes (26): Auto-invoke Skills, Basket Places - GUIDELINES, Buckets de Storage, Comandos de Desarrollo, Comandos permitidos:, Componentes/Dominios principales, Configuración del Entorno, CONVENCIONES DEL PROYECTO (+18 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (16): Props, ShareButton(), ShareButtonProps, canShare(), copyToClipboard(), getAbsoluteUrl(), isUserCancelled(), MESSAGES (+8 more)

### Community 18 - "Community 18"
Cohesion: 0.08
Nodes (32): MenuOpenButton(), MenuOpenButtonProps, OptionMenu(), Props, MENU_CLASSES, CornerPosition, MENU_CONSTANTS, ThemeMode (+24 more)

### Community 19 - "Community 19"
Cohesion: 0.11
Nodes (17): Animaciones, Auto-invoke Skills, Cierre del Modal, Configuración de openModal, confirmButton, Contenido Complejo (Componente), Contexto, Dominio: Modal (+9 more)

### Community 20 - "Community 20"
Cohesion: 0.12
Nodes (16): 1. Find or Create an Issue, 2. Create a Branch, 3. Work on the Change, 4. Make Atomic Commits, 5. Verify Before Pushing, 6. Create a Pull Request, AI-First Collaboration, Code of Conduct (+8 more)

### Community 21 - "Community 21"
Cohesion: 0.13
Nodes (14): AI Factory, Análisis de Imágenes, Análisis de Texto (Reviews), Auto-invoke Skills, Contexto, Dominio: AI Integration, Estructura, Manejo de Errores (+6 more)

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (8): Props, Service, BathroomIcon(), StoreIcon(), TransportIcon(), WifiIcon(), ServiceItem(), ServiceItemProps

### Community 23 - "Community 23"
Cohesion: 0.24
Nodes (10): triggerToast(), ToastProps, ToastType, createToast(), showErrorToast, showInfoToast, showSuccessToast, showToastWithAction() (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.13
Nodes (14): Auto-invoke Skills, Contexto, Diseño Visual, Dominio: Notificaciones, Duraciones, Estructura, Flujo Después de Mutación, Patrones Importantes (+6 more)

### Community 25 - "Community 25"
Cohesion: 0.17
Nodes (7): BaseDraggableMarker(), BaseDraggableMarkerProps, BaseMap(), BaseMarkerIcon(), BaseMarkerIconProps, useAppTheme(), createLeafletIcon()

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (13): Auto-invoke Skills, Contexto, Dominio: Autenticación, Errores de Auth, Estructura, Flujo OTP, Middleware, Patrones Importantes (+5 more)

### Community 27 - "Community 27"
Cohesion: 0.14
Nodes (13): Auto-invoke Skills, Contexto, Contribución (Wizard), Data Flow, Dominio: Comunidades, Estructura, Imágenes, Patrones Importantes (+5 more)

### Community 28 - "Community 28"
Cohesion: 0.25
Nodes (7): OpenInMaps(), Coordinates, useGeocoding(), BaseDraggableMarker, BaseMap, BaseMarker, CommunityMarker

### Community 29 - "Community 29"
Cohesion: 0.32
Nodes (8): ButtonVariant, NavigationButton(), CardCommunity(), Props, ClickableMarker(), useCustomNavigation(), PanelLoaderState, usePanelLoaderStore

### Community 30 - "Community 30"
Cohesion: 0.23
Nodes (8): AuthForm(), AnimatedTitle(), AnimatedTitleProps, FormContent(), useMatrixEffect(), useMeasure(), contentVariants, TITLE_MAP

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (12): Beneficios de la Refactorización, Componente Principal (`index.tsx`), Componentes UI, Constantes y Utilidades, Estructura de Directorios, GlobalMenu Component, Hook Principal (`hooks/useGlobalMenu.ts`), Hooks Específicos (+4 more)

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (12): Contexto, Cómo funciona Dark Mode, Dominio: Theme (Sistema de Temas), Estructura, Hooks, Referencias, Reglas Específicas, Stack Tecnológico (+4 more)

### Community 33 - "Community 33"
Cohesion: 0.17
Nodes (11): Auto-invoke Skills, Contexto, Dominio: Mapas, Estructura, Geocodificación, Marcadores, Patrones Importantes, Referencias (+3 more)

### Community 34 - "Community 34"
Cohesion: 0.17
Nodes (11): Contexto, Dominio: Panel, Estructura, Estructura de un Panel, Interception Route, Métodos de Cierre, Patrones Importantes, Qué NO hacer (+3 more)

### Community 35 - "Community 35"
Cohesion: 0.17
Nodes (11): Actualización de Perfil, Análisis AI de Imagen, Avatar, Contexto, Data Flow, Dominio: Perfil, Estructura, Patrones Importantes (+3 more)

### Community 36 - "Community 36"
Cohesion: 0.17
Nodes (11): Basket Places, Contribución, Dirección, Estado del proyecto, Licencia, Por qué existe, Proyecto AI-native, Qué es (+3 more)

### Community 37 - "Community 37"
Cohesion: 0.20
Nodes (5): Props, Props, DetailsBar(), Props, Stat

### Community 38 - "Community 38"
Cohesion: 0.20
Nodes (4): AIError, ImageValidationError, ImageValidationType, AI_ERROR_MESSAGES

### Community 39 - "Community 39"
Cohesion: 0.18
Nodes (10): Contexto, Dominio: Menú Global, Estructura, Gestos, Patrones Importantes, Referencias, Reglas Específicas, Stack Tecnológico (+2 more)

### Community 40 - "Community 40"
Cohesion: 0.31
Nodes (8): browserFileSchema, compressedImageSchema, UpdateProfileActionInput, updateProfileActionSchema, UpdateProfileFormData, updateProfileFormSchema, UpdateProfileServerInput, updateProfileServerSchema

### Community 41 - "Community 41"
Cohesion: 0.27
Nodes (8): NavigationControls(), Props, ReviewsSection(), useReviews(), Modal(), ModalActions, ModalConfig, useModalStore

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (9): Contexto, Códigos de Error, Dominio: Error Handling, Estructura, Referencias, Reglas Específicas, Result<T>, Stack Tecnológico (+1 more)

### Community 43 - "Community 43"
Cohesion: 0.25
Nodes (5): BaseMarker(), BaseMapProps, BaseMarkerProps, CommunityMarkerProps, MapProps

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (8): background_color, description, display, icons, name, short_name, start_url, theme_color

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (8): Checklist, How to Verify, Related Issue, Scope of Impact, Screenshots (if UI changes), Summary, What Changed, Why

### Community 46 - "Community 46"
Cohesion: 0.20
Nodes (9): Actual Behavior, Basketball Community Context, Console / Network Errors, Description, Environment, Expected Behavior, Possible Cause, Screenshots (+1 more)

### Community 48 - "Community 48"
Cohesion: 0.29
Nodes (6): Recognition, Reporting a Vulnerability, Response Timeline, Scope, Security Policy, Supported Versions

### Community 49 - "Community 49"
Cohesion: 0.27
Nodes (6): AuthGuard(), AuthGuardProps, DeleteAccountBtn(), ProtectedWrapper(), ProtectedWrapperProps, useAuth()

### Community 50 - "Community 50"
Cohesion: 0.33
Nodes (4): Textarea, TextareaProps, CornerIcon(), CornerProps

### Community 51 - "Community 51"
Cohesion: 0.33
Nodes (5): Acceptance Criteria, Additional Context, Affected Domain, Problem, Proposed Solution

### Community 53 - "Community 53"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 75 - "Community 75"
Cohesion: 0.16
Nodes (7): DropdownProfileOptions(), LogoutButton(), ProfileCommunities(), AddCommunityIcon(), BackboardIcon(), LogoutIcon(), SettingsIcon()

### Community 76 - "Community 76"
Cohesion: 0.22
Nodes (9): StepRenderer(), CommunityFormData, ContributionForm(), Props, useContributionForm(), UseContributionFormProps, RedirectionStep(), ContributionStore (+1 more)

### Community 77 - "Community 77"
Cohesion: 0.09
Nodes (21): PageProps, ClickableMarkerProps, HomeMap(), HomeMapProps, MapEventHandler(), transformResponseToFormData(), transformToCommunityForMap(), CommunityCard (+13 more)

### Community 81 - "Community 81"
Cohesion: 0.31
Nodes (6): ProfileBanner(), sendLoginCode(), AuthState, useAuthFlow(), ProfileBannerSkeleton(), useProfileStore

### Community 82 - "Community 82"
Cohesion: 0.31
Nodes (5): ClientProviders(), PanelLoader(), NavigationLoaderStore, useNavigationLoaderStore, NavigationLoader()

### Community 83 - "Community 83"
Cohesion: 0.39
Nodes (5): CommunitiesScrollList(), CommunitiesScrollListProps, DeleteCommunityBtn(), CommunitiesState, useCommunitiesProfileStore

### Community 85 - "Community 85"
Cohesion: 0.19
Nodes (11): usePanelDesktopGesture(), UsePanelDesktopGestureProps, usePanelSwipeGesture(), UsePanelSwipeGestureProps, usePanelUniversalGesture(), UsePanelUniversalGestureProps, PanelContent(), PanelContentProps (+3 more)

### Community 87 - "Community 87"
Cohesion: 0.18
Nodes (7): DescriptionSection(), DetailsSection(), Props, Props, ViewSwitcher(), DinamicSliderProps, SlideItem

### Community 88 - "Community 88"
Cohesion: 0.33
Nodes (5): Area, Context, Desired Outcome, Notes for AI Agents, Question

### Community 89 - "Community 89"
Cohesion: 0.23
Nodes (8): StepIndicator(), StepIndicatorProps, stepLabels, NoTypeSelectedStep(), NavigationStore, StepNumber, useNavigationStore, WarningIcon()

### Community 95 - "Community 95"
Cohesion: 0.24
Nodes (5): HeadingSection(), Props, CommunityType, Props, Props

## Knowledge Gaps
- **507 isolated node(s):** `supabase`, `AuthShellData`, `AnimatedTitleProps`, `CodeVerificationFormProps`, `EmailFormProps` (+502 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Coordinates` connect `Community 28` to `Community 0`, `Community 2`, `Community 43`, `Community 12`, `Community 77`, `Community 25`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `CommunityFullResponse` connect `Community 0` to `Community 12`, `Community 85`, `Community 77`, `Community 87`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `useCustomNavigation()` connect `Community 29` to `Community 3`, `Community 9`, `Community 41`, `Community 76`, `Community 81`, `Community 49`, `Community 18`, `Community 82`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `supabase`, `AuthShellData`, `AnimatedTitleProps` to the rest of the system?**
  _507 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06842604298356511 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05630834086118639 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.054340396445659606 - nodes in this community are weakly interconnected._