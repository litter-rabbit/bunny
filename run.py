

import tornado
import tornado.web
import tornado.ioloop

class IndexHandle(tornado.web.RequestHandler):

    def get(self):
        self.render('index.html')

class IndexHandle1(tornado.web.RequestHandler):

    def get(self):
        self.render('index.html')

class AboutHandle(tornado.web.RequestHandler):

    def get(self):
        self.render('about.html')

class ContactHandle(tornado.web.RequestHandler):

    def get(self):
        self.render('contact.html')


def main():
    import os
    application = tornado.web.Application(handlers=[(r'/', IndexHandle),(r'/index.html', IndexHandle1),
                                                    (r'/about.html',AboutHandle),(r'/contact.html',ContactHandle)],

        template_path = os.path.join(os.path.dirname(__file__), "templates"),
        static_path = os.path.join(os.path.dirname(__file__), "static"),
                                          )
    application.listen(8000)
    tornado.ioloop.IOLoop.current().start()


if __name__ == '__main__':
    main()


