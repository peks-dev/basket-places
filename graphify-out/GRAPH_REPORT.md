# Graph Report - basket-places  (2026-06-16)

## Corpus Check
- 366 files · ~147,358 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1400 nodes · 2581 edges · 94 communities (79 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `49b78d5f`
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

## Communities (94 total, 15 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (67): deleteCommunity(), getCommunitiesForMap(), getProfileCommunities(), registerCommunity(), updateCommunity(), createCommunityReview(), deleteAccount(), getCommunityReviews() (+59 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (48): CommentAnalysisError, CommentAnalysisRaw, CommentAnalysisResponse, CommentAnalysisResult, validateCommentAnalysis(), analyzeCommunity(), getManualCourtAnalysis(), Props (+40 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (44): Props, ImagePreview(), ImagePreviewProps, Props, ScheduleConstructor(), Props, StepHelp(), STEP_HELP (+36 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (33): CloseButton(), CloseButtonProps, HeadingSection(), Props, ReviewForm(), ReviewItemProps, Props, ReviewsSection() (+25 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): RoundImageInput(), EditProfileBtn(), EditProfileForm(), useUpdateProfile(), UseUpdateProfileReturn, compressImage(), CompressionOptions, ImageCompressionError (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (20): AnimatedTitle(), AnimatedTitleProps, CodeVerificationForm(), CodeVerificationFormProps, EmailForm(), EmailFormProps, ExpiredCodeMessage(), ExpiredCodeMessageProps (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (19): AuthShellData, getAuthShellData(), isAuthRelatedError(), mapToAuthError(), iceland, metadata, oxanium, RootLayout() (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (21): AddCommunityIcon(), ArrowUpIcon(), BackboardIcon(), ClubIcon(), DeleteIcon(), EditIcon(), EditProfile(), GearIcon() (+13 more)

### Community 8 - "Community 8"
Cohesion: 0.04
Nodes (47): dependencies, leaflet, motion, next, next-themes, react, react-dom, react-leaflet (+39 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (16): AuthContextType, AuthProvider(), AuthShell(), AuthShellProps, logout(), onAuthStateChange(), setSession(), supabase (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.05
Nodes (36): 1. Edición vs Creación, 2. Cleanup al Desmontar, 3. Imágenes: File vs String, 4. ConditionalStep (Solo Pickup), 5. Redirección Automática, Auto-invoke Skills, Contexto, createCommunity.ts (+28 more)

### Community 11 - "Community 11"
Cohesion: 0.13
Nodes (17): NavigationButtonProps, DefaultUserImage(), DefaultUserImageProps, IconSize, IconSize, UserAvatar(), UserAvatarProps, Button (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.21
Nodes (8): CommunityInsertData, CommunityUpdateData, RegisterCommunityFormData, UpdateCommunityFormData, createCommunity(), modifyCommunity(), uploadCommunityImages(), extractStoragePath()

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
Cohesion: 0.23
Nodes (11): OptionMenu(), Props, MENU_CLASSES, MenuContentProps, MenuFooter(), MenuHeader(), NavigationSection(), NavigationSectionProps (+3 more)

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
Cohesion: 0.12
Nodes (11): Props, Service, Props, Props, ViewSwitcher(), BathroomIcon(), StoreIcon(), TransportIcon() (+3 more)

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
Cohesion: 0.23
Nodes (8): OpenInMaps(), Coordinates, useGeocoding(), BaseDraggableMarker, BaseMap, BaseMarker, CommunityMarker, LocationData

### Community 29 - "Community 29"
Cohesion: 0.19
Nodes (12): ButtonVariant, NavigationButton(), CardCommunity(), Props, NavigationControls(), Props, StepRenderer(), ContributionForm() (+4 more)

### Community 30 - "Community 30"
Cohesion: 0.16
Nodes (14): PageProps, generateMetadata(), PageProps, generateMetadata(), getCommunityById(), transformResponseToFormData(), transformToCommunityForMap(), CommunityFullResponse (+6 more)

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
Cohesion: 0.26
Nodes (9): useGlobalMenu(), UseGlobalMenuReturn, useMenuKeyboard(), UseMenuKeyboardProps, useMenuNavigation(), useThemeControls(), GlobalOverlayState, useGlobalOverlayStore (+1 more)

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
Cohesion: 0.24
Nodes (10): AuthGuard(), AuthGuardProps, AuthContext, DeleteAccountBtn(), LogoutButton(), useAuth(), Modal(), ModalActions (+2 more)

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
Nodes (7): CornerPosition, MENU_CONSTANTS, ThemeMode, PROTECTED_ROUTES, UseMenuNavigationReturn, UseThemeControlsReturn, getThemeToggleLabel()

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
Cohesion: 0.22
Nodes (5): DropdownProfileOptions(), ProfileCommunities(), ProtectedWrapper(), ProtectedWrapperProps, SettingsIcon()

### Community 76 - "Community 76"
Cohesion: 0.29
Nodes (7): PanelContent(), PanelContentProps, PanelLoaderState, usePanelLoaderStore, ActivePanel, UIState, useUIStateStore

### Community 77 - "Community 77"
Cohesion: 0.24
Nodes (11): ClickableMarker(), ClickableMarkerProps, HomeMap(), HomeMapProps, MapEventHandler(), CommunityCard, communityData, CommunityDataForDB (+3 more)

### Community 81 - "Community 81"
Cohesion: 0.23
Nodes (8): AuthForm(), ProfileBanner(), sendLoginCode(), AuthState, useAuthFlow(), useMeasure(), ProfileBannerSkeleton(), useProfileStore

### Community 82 - "Community 82"
Cohesion: 0.27
Nodes (6): ClientProviders(), PanelLoader(), GlobalMenu(), NavigationLoaderStore, useNavigationLoaderStore, NavigationLoader()

### Community 83 - "Community 83"
Cohesion: 0.39
Nodes (5): CommunitiesScrollList(), CommunitiesScrollListProps, DeleteCommunityBtn(), CommunitiesState, useCommunitiesProfileStore

### Community 85 - "Community 85"
Cohesion: 0.33
Nodes (6): usePanelDesktopGesture(), UsePanelDesktopGestureProps, usePanelSwipeGesture(), UsePanelSwipeGestureProps, usePanelUniversalGesture(), UsePanelUniversalGestureProps

### Community 86 - "Community 86"
Cohesion: 0.42
Nodes (7): categorySchema, coordinatesSchema, imageSchema, scheduleSchema, serviceSchema, registerCommunitySchema, updateCommunitySchema

### Community 87 - "Community 87"
Cohesion: 0.12
Nodes (8): DetailsSection(), DinamicSliderProps, SlideItem, ClockIcon(), CommentsIcon(), DetailsIcon(), LocationIcon(), TextIcon()

### Community 88 - "Community 88"
Cohesion: 0.33
Nodes (5): Area, Context, Desired Outcome, Notes for AI Agents, Question

### Community 89 - "Community 89"
Cohesion: 0.25
Nodes (5): config, CookieData, securityHeaders, DEFAULT_CENTER, MapState

### Community 90 - "Community 90"
Cohesion: 0.14
Nodes (11): CategoriesListControllers(), CategoriesListControllersProps, CategoryCardDisplay(), CategoryCardInfoProps, GENDER_DETAILS, getAgeRange(), CategoriesInfoProps, Gender (+3 more)

### Community 91 - "Community 91"
Cohesion: 0.38
Nodes (4): MenuOpenButton(), MenuOpenButtonProps, generateCornerIcons(), MenuContent()

### Community 92 - "Community 92"
Cohesion: 0.33
Nodes (5): Graphify: grafo de código precomputado, Política de sincronización: hook `pre-commit` (no `post-commit`), Qué se versiona, Regenerar el grafo manualmente, Setup en un clon nuevo

## Knowledge Gaps
- **511 isolated node(s):** `Qué se versiona`, `Política de sincronización: hook `pre-commit` (no `post-commit`)`, `Setup en un clon nuevo`, `Regenerar el grafo manualmente`, `supabase` (+506 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CommunityFullResponse` connect `Community 30` to `Community 0`, `Community 12`, `Community 76`, `Community 77`, `Community 87`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `useCustomNavigation()` connect `Community 29` to `Community 0`, `Community 3`, `Community 37`, `Community 9`, `Community 75`, `Community 77`, `Community 81`, `Community 49`, `Community 82`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `Coordinates` connect `Community 28` to `Community 0`, `Community 2`, `Community 43`, `Community 77`, `Community 25`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `Qué se versiona`, `Política de sincronización: hook `pre-commit` (no `post-commit`)`, `Setup en un clon nuevo` to the rest of the system?**
  _511 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07169554875976894 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05630834086118639 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05707762557077625 - nodes in this community are weakly interconnected._