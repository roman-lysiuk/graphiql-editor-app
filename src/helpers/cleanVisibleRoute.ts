export default function cleanVisibleRoute(route: string): string {
  const deleteHttp = route.replace(/http:\/\//gi, '');
  const deleteHttpS = deleteHttp.replace(/https:\/\//gi, '');

  return deleteHttpS;
}
