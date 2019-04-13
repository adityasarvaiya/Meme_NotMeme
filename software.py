from flask import Flask, render_template, redirect, url_for, request
from fastai.vision import *
from fastai.widgets import *
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

@app.route('/')
def hello_world():


    return  render_template("welcome.html")

@app.route('/index.html')
def hello_world1():
    return  render_template("index.html")

@app.route('/procedure.html' )
def hello_world2():
    return  render_template("procedure.html")

@app.route('/question.html',methods = ['POST', 'GET'])
def hello_world3():

    path = ''
    learn = load_learner(path)

    File1 = request.files['File1']
    File1.save(secure_filename(File1.filename))

    img = open_image(File1.filename)
    pred_class,pred_idx,outputs = learn.predict(img)

    # return pred_class

    return  render_template("question.html", qad = pred_class)


    # bytes = await get_bytes(request.query_params["url"])



    # img = open_image(BytesIO(bytes))
    # _,_,losses = learner.predict(img)
    # return JSONResponse({
    #     "predictions": sorted(
    #         zip(cat_learner.data.classes, map(float, losses)),
    #         key=lambda p: p[1],
    #         reverse=True
    #     )
    # })


    # Name = request.form['Name']
    # # Number = request.form['Number']
    # Email = request.form['Email']
    # outputformat = request.form['outputformat']
    # optionsRadios = request.form['optionsRadios']
    
    # if(optionsRadios == "text"):
    #     Text1 = request.form['Text1']
    #     file_object = open("InputText.txt",'w')
    #     file_object.write(Text1)
    #     file_object.close()
    #     apps = Application()
    #     question_ans_dataframe = apps.ques_application("InputText.txt",outputformat,Email)
    #     # pdf2 = pdf()
    #     # pdf2.generate_pdf_quesans(question_ans_dataframe)
    #     # mail_age = ma()
    #     # mail_age.mail_pdf(Email)
    #     return  render_template("question.html", qad = question_ans_dataframe)


    # elif(optionsRadios == "file"):
    #     File1 = request.files['File1']
    #     File1.save(secure_filename(File1.filename))
    #     apps = Application()
    #     question_ans_dataframe = apps.ques_application(File1.filename,outputformat,Email)
    #     # pdf2 = pdf()
    #     # pdf2.generate_pdf_quesans(question_ans_dataframe)
    #     # mail_age = ma()
    #     # mail_age.mail_pdf(Email)
    #     return  render_template("question.html", qad = question_ans_dataframe, email = Email)

    # elif(optionsRadios == "link"):
    #     Link1 = request.form['Link1']
    #     t  = TextSummarizer(25)
    #     t.summarize_from_url(Link1)
    #     apps = Application()
    #     question_ans_dataframe = apps.ques_application("summarizer_output2.txt",outputformat,Email)
    #     # pdf2 = pdf()
    #     # pdf2.generate_pdf_quesans(question_ans_dataframe)
    #     # mail_age = ma()
    #     # mail_age.mail_pdf(Email)
    #     return  render_template("question.html", qad = question_ans_dataframe)

    
    # return  render_template("question.html")


@app.route('/summarization.html')
def hello_world4():
    return  render_template("summarization.html")

@app.route('/summarized.html',methods = ['POST', 'GET'])
def hello_world5():

    Name = request.form['Name']
    # Number = request.form['Number']
    Email = request.form['Email']
    Nolines = request.form['Nolines']
    optionsRadios = request.form['optionsRadios']
    t  = TextSummarizer(Nolines)
    
    if(optionsRadios == "text"):
        Text1 = request.form['Text1']
        t.summarize_from_text(Text1)
        pdf = pdfgeneration()
        pdf.generate_pdf_summarizer("summarizer_output2.txt","summarized.pdf")
        mail_age = ma()
        mail_age.mail_pdf(Email,"summarized.pdf",1)
        f = open("summarizer_output.txt")
        summarized_text = f.read()
        return  render_template("summarized.html", summarized_text = summarized_text)


    elif(optionsRadios == "file"):
        File1 = request.files['File1']
        File1.save(secure_filename(File1.filename))
        t.summarize_from_file(File1.filename)
        pdf = pdfgeneration()
        pdf.generate_pdf_summarizer("summarizer_output2.txt","summarized.pdf")
        mail_age = ma()
        mail_age.mail_pdf(Email,"summarized.pdf",1)
        f = open("summarizer_output.txt")
        summarized_text = f.read()
        return  render_template("summarized.html", summarized_text = summarized_text)
    

    elif(optionsRadios == "link"):
        Link1 = request.form['Link1']
        t.summarize_from_url(Link1)
        pdf = pdfgeneration()
        pdf.generate_pdf_summarizer("summarizer_output2.txt","summarized.pdf")
        mail_age = ma()
        mail_age.mail_pdf(Email,"summarized.pdf",1)
        f = open("summarizer_output.txt")
        summarized_text = f.read()
        return  render_template("summarized.html", summarized_text = summarized_text)
    
    return  render_template("summarization.html")

@app.route('/checked.html',methods = ['POST', 'GET'])
def hello_world89():
    Email = request.form['Email']    
    Qus = request.form.getlist('questions')
    Ans = request.form.getlist('answer')
    frames = zip(Qus,Ans)
    dataframe1 = [] 
    row1 = {}
    for row in frames:
        row1 = { "Full_qus" : row[0] , "Answer": row[1] }
        dataframe1.append(row1)
        row1 = {}
    pdf2 = pdf()
    pdf2.generate_pdf_quesans(dataframe1)
    mail_age = ma()
    mail_age.mail_pdf(Email)

    # return  render_template("index2.html", qad = dataframe1)
    return  render_template("welcome.html")

if __name__ == '__main__':
    app.run()